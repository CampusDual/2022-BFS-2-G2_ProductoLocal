package com.example.demo.service;

import com.borjaglez.springify.repository.filter.IPageFilter;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.model.QuerySortPaginationRequest;
import com.example.demo.utils.Constant;

public class AbstractDemoService {
	protected void checkInputParams(IPageFilter pageFilter) {
		if (pageFilter.getPageNumber() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	protected void checkInputParams(QuerySortPaginationRequest pageFilter) {
		if (pageFilter.getPageIndex() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	public User fromEditUserRequest(User userRequest) {
		return new User(userRequest.getId(), userRequest.getNif(),userRequest.getName(), userRequest.getSurname(),
				userRequest.getAddress(), userRequest.getCity(), userRequest.getPhone(),
				userRequest.getLogin(), userRequest.getEmail(), userRequest.getZip(), userRequest.getPassword(), userRequest.getProfiles());
	}
	
	public Product fromEditProductRequest(Product productRequest) {
		return new Product(productRequest.getId(), productRequest.getName(),productRequest.getQuantity(), productRequest.getDescription(),
				productRequest.getTypeProd(), productRequest.getPrice(), productRequest.getImageUrl(), productRequest.getImage(), productRequest.getUser());
	}
}
