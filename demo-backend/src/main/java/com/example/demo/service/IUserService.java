package com.example.demo.service;

import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;

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
	
	Integer editUser(EditUserDTO editUserRequest);
	
}
