package com.example.demo.service;

import com.example.demo.dto.ProductDTO;


public interface IProductService {

	ProductDTO createProduct(ProductDTO createProductRequest);
	
	Integer editProduct(ProductDTO editProductRequest);
	
	ProductDTO getProduct(Integer id);
}
