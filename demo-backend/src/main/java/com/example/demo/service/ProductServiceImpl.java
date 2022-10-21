package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.mapper.ContactMapper;
import com.example.demo.dto.mapper.ProductMapper;
import com.example.demo.entity.Contact;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductServiceImpl extends AbstractDemoService implements IProductService {
	
	@Autowired
	ProductRepository productRepository;

	@Override
	public ProductDTO createProduct(ProductDTO createProductRequest) {
		Product product = ProductMapper.INSTANCE.productDtoToProduct(createProductRequest);
		Product newProduct = productRepository.save(product);
		return ProductMapper.INSTANCE.productToProductDto(newProduct);
		
	}

	@Override
	public Integer editProduct(ProductDTO editProductRequest) {
		Product mappedProduct = ProductMapper.INSTANCE.productDtoToProduct(editProductRequest);
		Product editProduct = productRepository.save(fromEditProductRequest(mappedProduct));
		return editProduct.getId();
	}
	
	@Override
	public ProductDTO getProduct(Integer id) {
		Product product = productRepository.findById(id).orElse(null);
		return ProductMapper.INSTANCE.productToProductDto(product);
	}

}
