package com.example.demo.service;

import java.util.List;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.ProductDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;


public interface IProductService {

	ProductDTO createProduct(ProductDTO createProductRequest);
	
	Integer editProduct(ProductDTO editProductRequest);
	
	ProductDTO getProduct(Integer id);

	DataSourceRESTResponse<List<ProductDTO>> getProducts(AnyPageFilter pageFilter);
	
	DataSourceRESTResponse<List<ProductDTO>> getMyProducts(AnyPageFilter pageFilter, String login);

	List<ProductDTO> findAll();
	
	Integer deleteProduct(Integer id);
	
	List<ProductDTO> findByUser(String login);
	
	DataSourceRESTResponse<List<ProductDTO>> findCities(String city, AnyPageFilter pageFilter);
	
	DataSourceRESTResponse<List<ProductDTO>> findTypes(String typeProd, AnyPageFilter pageFilter);
	
}
