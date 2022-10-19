package com.example.demo.service;

import com.borjaglez.springify.repository.filter.IPageFilter;
import com.example.demo.dto.ContactDTO;
import com.example.demo.entity.Contact;
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
	
	public Contact fromEditContactRequest(Contact contactRequest) {
		return new Contact(contactRequest.getId(), contactRequest.getName(), contactRequest.getSurname1(),
				contactRequest.getSurname2(), contactRequest.getPhone(), contactRequest.getEmail());
	}
	
	public Contact fromCreateContactRequest(ContactDTO contactRequest) {
		return new Contact(contactRequest.getName(), contactRequest.getSurname1(), contactRequest.getSurname2(),
				contactRequest.getPhone(), contactRequest.getEmail());
	}
	
	/*
	(Integer id, String nif, String name, String surname, 
			String address, String city, Integer phone, String login, String email, 
			String zip, String password)
	}*/
	
	public User fromEditUserRequest(User userRequest) {
		return new User(userRequest.getId(), userRequest.getNif(),userRequest.getName(), userRequest.getSurname(),
				userRequest.getAddress(), userRequest.getCity(), userRequest.getPhone(),
				userRequest.getLogin(), userRequest.getEmail(), userRequest.getZip(), userRequest.getPassword());
	}
}
