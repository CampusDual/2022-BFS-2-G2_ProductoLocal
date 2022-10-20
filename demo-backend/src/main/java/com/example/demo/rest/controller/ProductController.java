package com.example.demo.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.enums.ResponseCodeEnum;
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
	@PreAuthorize("hasAnyAuthority('PRODUCTS')")
	public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO createProductRequest, BindingResult result) {
		LOGGER.info("createProduct in progress...");
		
		ProductDTO productNew = null;
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.CONTACT_CREATE_SUCCESS;
		
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
	
	
}
      