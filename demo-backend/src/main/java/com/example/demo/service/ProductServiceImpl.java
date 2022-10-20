package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.mapper.ProductMapper;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductServiceImpl implements IProductService {
	
	@Autowired
	ProductRepository productRepository;

	@Override
	public ProductDTO createProduct(ProductDTO createProductRequest) {
		Product product = ProductMapper.INSTANCE.productDtoToProduct(createProductRequest);
		Product newProduct = productRepository.save(product);
		return ProductMapper.INSTANCE.productToProductDto(newProduct);
		
	}

}
