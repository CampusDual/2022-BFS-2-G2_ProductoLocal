package com.example.demo.rest.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.IProductService;
import com.example.demo.utils.Constant;


@CrossOrigin(origins = {"http://localhost:4201"})
@RestController
@RequestMapping(ProductController.REQUEST_MAPPING)
public class ProductController {
	public static final String REQUEST_MAPPING = "products";
	private static final Logger LOGGER= LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	private IProductService productService;
	
	@PostMapping(path = "/createProduct")
	@PreAuthorize("hasAnyAuthority('CREATE_PRODUCTS','CREATE_PRODUCTS_ADMIN')")
	public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO createProductRequest, BindingResult result) {
		LOGGER.info("createProduct in progress...");
		
		ProductDTO productNew = null;
		if ((createProductRequest.getImage() != null &&  createProductRequest.getImageUrl() != null) ||
				(!createProductRequest.getImage().equals("") && !createProductRequest.getImageUrl().equals("") )) {
			String image = createProductRequest.getImage();
			String imageUrl = createProductRequest.getImageUrl();
			storeImage(image, imageUrl);
		}
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PRODUCT_CREATE_SUCCESS;
		
		if (!result.hasErrors()) {
			try {
				productNew = productService.createProduct(createProductRequest);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());	
			}
			catch (DataAccessException dae) {
				message = Constant.DATABASE_QUERY_ERROR;
				status = HttpStatus.BAD_REQUEST;
				
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				response.put(Constant.ERROR, dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			}
			response.put("producto", productNew);
		}
		else {
			List<String> errors = new ArrayList<>();
			for(FieldError error : result.getFieldErrors()) {
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
		editProductRequest.setUser(productOlder.getUser());
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.PRODUCT_EDIT_SUCCESS;
		if(productOlder!=null) {
			if(!result.hasErrors()) {
				try {
					id = productService.editProduct(editProductRequest);
					response.put("productid", id);
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				}catch (DataAccessException e) {
						if(e.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR));
						status= HttpStatus.BAD_REQUEST;
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
					response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				}
				
			}else {
				List<String> errors = new ArrayList<>();
				for(FieldError error : result.getFieldErrors()) {
					errors.add(error.getDefaultMessage());
				}
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
				message = Constant.PRODUCT_NOT_EDIT;
				response.put(Constant.ERROR, errors);
				status = HttpStatus.OK;
			}
		}else {
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			message = Constant.ID_NOT_EXISTS;
			status = HttpStatus.BAD_REQUEST;
		}
		
		response.put(Constant.MESSAGE, message);
			LOGGER.info("editProduct is finished...");
		return new ResponseEntity<Map<String, Object>>(response, status);
	
	}
	
	@PostMapping(path = "/getProducts",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS_ADMIN','GET_PRODUCTS_CLIENT')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> getProducts(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("showProducts in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		
		try {
			dres = productService.getProducts(pageFilter);
		}
		catch(DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("showProducts is finished...");
		return dres;
	}
	
	
	/*
	 * @GetMapping(path = "/getProducts")
	 * 
	 * @PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS')") public @ResponseBody
	 * List<ProductDTO> findAll() { LOGGER.info("findAll in progress..."); return
	 * productService.findAll(); }
	 */
	
	@GetMapping("/getProduct")
	//@PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS', 'SHOW_PRODUCTS_ADMIN')")
	public ResponseEntity<?> getProduct(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getProduct in progress...");
		ProductDTO product = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?>re = null;
		try {
			product = productService.getProduct(id);
			if(product==null) {
				response.put(Constant.MESSAGE, Constant.PRODUCT_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<ProductDTO>(product, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re=  new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		} 
		LOGGER.info("getProduct is finished...");
		return re;
	}
		
	@DeleteMapping("/deleteProduct")
	@PreAuthorize("hasAnyAuthority('DELETE_PRODUCTS','DELETE_PRODUCTS_ADMIN')")
	public ResponseEntity<?> deleteProduct(@RequestParam(value="id") Integer id ) {
		LOGGER.info("deleteProduct in progress...");
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		String message = Constant.PRODUCT_DELETE_SUCCESS;
		
		try {
			productService.deleteProduct(id);
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
		}
		catch (DataAccessException dae) {
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, dae.getMessage().concat(": ").concat(dae.getMostSpecificCause().getMessage()));
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			status = HttpStatus.BAD_REQUEST;
			message = Constant.CONTACT_NOT_DELETE;
		}
		response.put(Constant.MESSAGE, message);
		LOGGER.info("deleteContact is finished...");
		return new ResponseEntity<Map<String, Object>>(response,status);
		
	}

	
	@PostMapping(path = "/myProducts",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('SHOW_PRODUCTS','GET_PRODUCTS_CLIENT')")
	public @ResponseBody DataSourceRESTResponse<List<ProductDTO>> getMyProducts(@RequestBody AnyPageFilter pageFilter, @RequestParam(value = "login") String login) {
		LOGGER.info("showMyProducts in progress...");
		DataSourceRESTResponse<List<ProductDTO>> dres = new DataSourceRESTResponse<>();
		
		try {
			dres = productService.getMyProducts(pageFilter, login);
		}
		catch(DataAccessException dae) {
			if (dae.getMostSpecificCause().getMessage().contains(Constant.DATABASE_QUERY_ERROR)) {
				LOGGER.error(dae.getMessage());
				dres.setResponseMessage(dae.getMessage());
			}
		}
		LOGGER.info("showMyProducts is finished...");
		return dres;
	}
	
	
	
	public void storeImage(String image, String imageName) {
		final String IMG_PATH = "./src/main/resources/images/";
		String fullImagePath = IMG_PATH + imageName;
			
		
		byte[] imageDecode = null;
		
		byte[] base64DecodeImage = null;
		
		Base64.Decoder decoder = Base64.getDecoder();
		
		/* 
		 * descomponemos la cadena texto base64 en
		 * un array de bytes codificados en base 64
		 * 
		*/
		try {
			
			base64DecodeImage = loadImage64(image);
		
		} catch (Exception e) {
		
			e.printStackTrace();
		
		}
		
		if (base64DecodeImage != null) {
		
			imageDecode = decoder.decode(base64DecodeImage);
			
			if (imageDecode != null) {
				//guardar a fichero
				createImageFile(imageDecode, fullImagePath);
				
			}
		}
	}
		
			
	private byte[] loadImage64(String data)  {
					
		int length = data.length();
				
		byte[] bytes = new byte[length];
		
		bytes = data.getBytes();
		
		return bytes;	
		
	}
	
	private void createImageFile(byte[] data, String path) {
		
		File i = new File(path);
		
		try(OutputStream fos = new FileOutputStream(i);) {
			
			fos.write(data);
			
			
		} catch (FileNotFoundException fnfe) {

			fnfe.printStackTrace();
		
		} catch (IOException ioe) {

			ioe.printStackTrace();
		}
			
	}
	
	

	
	
	
	
	
	
	
	
	
	
}
      