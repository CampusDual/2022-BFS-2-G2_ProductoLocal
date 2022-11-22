package com.example.demo.rest.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.Product;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.IProductService;
import com.example.demo.utils.Constant;

@CrossOrigin(origins = { "http://localhost:4201" })
@RestController
@RequestMapping(ProductController.REQUEST_MAPPING)
public class ProductController {
	public static final String REQUEST_MAPPING = "products";
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private IProductService productService;

	/**
	 * @param createProductRequest
	 * @param result
	 * @return
	 */
	@PostMapping(path = "/createProduct")
	@PreAuthorize("hasAnyAuthority('CREATE_PRODUCTS','CREATE_PRODUCTS_ADMIN')")
	public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO createProductRequest, BindingResult result) {
		LOGGER.info("createProduct in progress...");
		ProductDTO productNew = null;

		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PRODUCT_CREATE_SUCCESS;

		if (!result.hasErrors()) {
			try {
				productNew = productService.createProduct(createProductRequest);
				productNew.setImageUrl(Integer.toString(productNew.getId()) + ".jpg");
				productNew.setImage(createProductRequest.getImage());
				this.editProduct(productNew, result);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
			} catch (DataAccessException dae) {
				message = Constant.DATABASE_QUERY_ERROR;
				status = HttpStatus.BAD_REQUEST;

				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				response.put(Constant.ERROR,
						dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			}
			response.put("producto", productNew);
		} else {
			List<String> errors = new ArrayList<>();
			for (FieldError error : result.getFieldErrors()) {
				errors.add(error.getDefaultMessage());
			}
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
			message = Constant.PRODUCT_NOT_CREATED;
			response.put(Constant.MESSAGE, errors);
			status = HttpStatus.BAD_REQUEST;

		}
		LOGGER.info("createProduct is finished...");
		response.put(Constant.MESSAGE, message);

		return new ResponseEntity<Map<String, Object>>(response, status);
	}

	@PostMapping(path = "/editProduct", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('EDIT_PRODUCTS')")
	public ResponseEntity<?> editProduct(@Valid @RequestBody ProductDTO editProductRequest, BindingResult result) {
		LOGGER.info("editProduct in progress...");
		int id = 0;
		ProductDTO productOlder = productService.getProduct(editProductRequest.getId());
		if ((editProductRequest.getImage() != null && editProductRequest.getImageUrl() != null)
				&& (!editProductRequest.getImage().equals("") && !editProductRequest.getImageUrl().equals(""))) {
			String image = editProductRequest.getImage();
			String imageUrl = Integer.toString(editProductRequest.getId()) + ".jpg";
			editProductRequest.setImageUrl(imageUrl);
			storeImage(image, imageUrl, productOlder.getUser().getLogin());

		}

		editProductRequest.setUser(productOlder.getUser());
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PRODUCT_EDIT_SUCCESS;
		if (productOlder != null) {
			if (!result.hasErrors()) {
				try {
					id = productService.editProduct(editProductRequest);
					response.put("productid", id);
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				} catch (DataAccessException e) {
					if (e.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR))
						;
					status = HttpStatus.BAD_REQUEST;
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
					response.put(Constant.ERROR,
							e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				}

			} else {
				List<String> errors = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					errors.add(error.getDefaultMessage());
				}
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
				message = Constant.PRODUCT_NOT_EDIT;
				response.put(Constant.ERROR, errors);
				status = HttpStatus.OK;
			}
		} else {
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			message = Constant.ID_NOT_EXISTS;
			status = HttpStatus.BAD_REQUEST;
		}

		response.put(Constant.MESSAGE, message);
		LOGGER.info("editProduct is finished...");
		return new ResponseEntity<Map<String, Object>>(response, status);

	}

	@PostMapping(path = "/getProducts", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN','GET_PRODUCTS_CLIENT')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> getProducts(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("showProducts in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.getProducts(pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("showProducts is finished...");
		return dres;
	}


	@GetMapping("/getProduct")
	public ResponseEntity<?> getProduct(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getProduct in progress...");
		ProductDTO product = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?> re = null;
		try {
			product = productService.getProduct(id);

			if (product == null) {
				response.put(Constant.MESSAGE, Constant.PRODUCT_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			} else {
				if (product.getImageUrl() == null) {

					product.setImageUrl(Integer.toString(id) + ".jpg");
				}
				product.setImage(imageToString(product.getImageUrl(), product.getUser().getLogin()));

				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<ProductDTO>(product, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		LOGGER.info("getProduct is finished...");
		return re;
	}

	@DeleteMapping("/deleteProduct")
	@PreAuthorize("hasAnyAuthority('DELETE_PRODUCTS','DELETE_PRODUCTS_ADMIN')")
	public ResponseEntity<?> deleteProduct(@RequestParam(value = "id") Integer id) {
		LOGGER.info("deleteProduct in progress...");
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		String message = Constant.PRODUCT_DELETE_SUCCESS;
		String userLogin = productService.getProduct(id).getUser().getLogin();

		try {
			productService.deleteProduct(id);
			deleteImage(id, userLogin);
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
		} catch (DataAccessException dae) {
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			status = HttpStatus.BAD_REQUEST;
			message = Constant.CONTACT_NOT_DELETE;
		}
		response.put(Constant.MESSAGE, message);
		LOGGER.info("deleteContact is finished...");
		return new ResponseEntity<Map<String, Object>>(response, status);

	}

	@PostMapping(path = "/myProducts", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS','GET_PRODUCTS_CLIENT', 'SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> getMyProducts(@RequestBody AnyPageFilter pageFilter,
			@RequestParam(value = "login") String login) {
		LOGGER.info("showMyProducts in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.getMyProducts(pageFilter, login);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("showMyProducts is finished...");
		return dres;
	}

	@PostMapping(path = "/findCities", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findCities(@RequestParam String city,
			@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findCities in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findCities(city, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findCities is finished...");
		return dres;
	}
	
	@PostMapping(path = "/findCitiesProducer", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findCitiesProducer(@RequestParam String city, @RequestParam String producer, @RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findCitiesProducer in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findCitiesProducer(city, producer, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findCitiesProducer is finished...");
		return dres;
	}


	@PostMapping(path = "/findTypes", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findTypes(@RequestParam String typeProd,
			@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findTypes in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findTypes(typeProd, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findTypes is finished...");
		return dres;
	}

	@PostMapping(path = "/findTypesProducer", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findTypesProducer(@RequestParam String typeProd,
			@RequestParam String producer, @RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findTypesProducer in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findTypesProducer(typeProd, producer, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findTypesProducer is finished...");
		return dres;
	}

	@PostMapping(path = "/findCityType", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findCityTypes(@RequestParam String city,
			@RequestParam String type, @RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findCityTypes in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findByCityType(city, type, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findCityTypes is finished...");
		return dres;
	}

	@PostMapping(path = "/findCityTypeProducer", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> findCityTypesProducer(@RequestParam String city,
			@RequestParam String type, @RequestParam String producer, @RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("findCityTypesProducer in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = productService.findByCityTypeProducer(city, type, producer, pageFilter);
			List<ProductDTO> products = dres.getData();
			for (ProductDTO p : products) {
				if (p.getImageUrl() == null) {
					p.setImageUrl(Integer.toString(p.getId()) + ".jpg");
				}
				p.setImage(imageToString(p.getImageUrl(), p.getUser().getLogin()));
			}
			dres.setData(products);
		} catch (DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("findCityTypesProducer is finished...");
		return dres;
	}
	
	
	  @GetMapping(path = "/getData") 
	  @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN')")
	  public @ResponseBody List<Object> findData() { 
		  LOGGER.info("findAll in progress..."); 
		  return productService.findData(); }
	
	

	/**
	 * 
	 * Recibe la cadena de texto del frontend en base64, se descodifica y se graba
	 * en un fichero jpg.
	 *
	 * 
	 * @param image
	 * @param imageName
	 */

	public void storeImage(String image, String imageName, String login) {
		String fullImagePath = Constant.IMG_PATH + login + "/" + imageName;
		String directoryPath = Constant.IMG_PATH + login + "/";
		byte[] base64DecodeImage = null;
		Base64.Decoder decoder = Base64.getDecoder();
		/*
		 * descomponemos la cadena texto base64 en un array de bytes codificados en base
		 * 64
		 * 
		 */
		try {
			base64DecodeImage = decoder.decode(image);
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
		}
		if (base64DecodeImage != null) {
			createImageFile(base64DecodeImage, fullImagePath, directoryPath);
		}
	}

	/**
	 * 
	 * Crea un fichero de imagen (jpg) en el sistema de ficheros del servidor
	 * (backend), en la ruta indicada
	 * 
	 * @param data
	 * @param path
	 */

	private void createImageFile(byte[] data, String imagePath, String directoryPath) {
		Path path = Paths.get(directoryPath);
		if (Files.exists(path)) {
			File i = new File(imagePath);
			try (OutputStream fos = new FileOutputStream(i);) {
				fos.write(data);
			} catch (FileNotFoundException fnfe) {
				fnfe.printStackTrace();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			}
		} else {
			File i = new File(imagePath);
			try {
				Files.createDirectories(path);
			} catch (IOException e) {
				e.printStackTrace();
			}
			try (OutputStream fos = new FileOutputStream(i);) {
				fos.write(data);
			} catch (FileNotFoundException fnfe) {
				fnfe.printStackTrace();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			}

		}

	}

	/**
	 * 
	 * Convierte un fichero de imagen (jpg) en una cadena de texto codificada con
	 * base64 para enviar a frontend.
	 * 
	 * 
	 * @param fileName
	 * @param userLogin
	 * @return
	 */
	public String imageToString(String fileName, String userLogin) {
		String base64Data = null;
		String fullPath = Constant.IMG_PATH + userLogin + "/" + fileName;
		Base64.Encoder encoder = Base64.getEncoder();
		try {
			File imageFile = new File(fullPath);
			if (!imageFile.exists()) {
				fullPath = Constant.IMG_PATH + "default/veg-logo.png";
				imageFile = new File(fullPath);
			}
			FileInputStream fis = new FileInputStream(imageFile);
			byte[] rawBytes = new byte[(int) imageFile.length()];
			rawBytes = fis.readAllBytes();
			base64Data = encoder.encodeToString(rawBytes);
			base64Data = Constant.BASE64HEADER + base64Data;
			fis.close();
		} catch (FileNotFoundException fnfe) {
			// base64Data = "";
			fnfe.printStackTrace();
		} catch (NullPointerException npe) {
			// base64Data = "";
			npe.printStackTrace();
		} catch (IOException ioe) {
			// base64Data = "";
			ioe.printStackTrace();
		}
		return base64Data;
	}
	
	
	public void deleteImage(int fileName, String folderName) {
		
		String pathRoot = Constant.IMG_PATH;
		
		String fullPath = pathRoot + "\\" + folderName + "\\" + Integer.toString(fileName) + ".jpg";
		
		System.out.println(fullPath);
		
		try {
		
			File f = new File(fullPath);
			
			if (f.exists()) {
				Boolean result = f.delete();
				
				String message = result ? "File deleted!" : "File cannot be deleted";
				
				System.out.println(message);
			
			}
		
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	

}
