package com.example.demo.service;

import java.util.List;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.rest.response.DataSourceRESTResponse;

public interface IUserService {
	
	/**
	 * Crea un nuevo usuario en la BDD.
	 * 
	 * @return el id del usuario creado.
	 * @since 0.0.5
	 */
	UserDTO createUser(UserDTO createUserRequest);
	
	UserDTO getUser(String login);
	
	UserDTO getUser(Integer id);
	
	String deleteUser(String login);
	
	List<UserDTO> findAll();
	
	List<UserDTO> findProducers();

	Integer editUser(EditUserDTO editUserRequest);

	DataSourceRESTResponse<List<UserDTO>> findProducers(int id, AnyPageFilter pageFilter);
}