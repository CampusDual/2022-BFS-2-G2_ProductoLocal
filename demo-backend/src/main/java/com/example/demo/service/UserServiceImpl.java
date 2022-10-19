package com.example.demo.service;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.mapper.ContactMapper;
import com.example.demo.dto.mapper.EditUserMapper;
import com.example.demo.dto.mapper.UserMapper;
import com.example.demo.entity.Contact;
import com.example.demo.entity.Section;
import com.example.demo.entity.User;
import com.example.demo.exception.DemoException;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.Constant;


@Service
public class UserServiceImpl extends AbstractDemoService implements IUserService {

	/**
	 * Especificación JPA para {@link User}.
	 */
	@Autowired
	private UserRepository userRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public UserDTO createUser(UserDTO createUserRequest) {
		User user = UserMapper.INSTANCE.userDTOtoUser(createUserRequest);
		User newUser = userRepository.save(user);
		return UserMapper.INSTANCE.userToUserDto(newUser);
	}
	
	@Override
	public UserDTO getUser(String login) {
		User user = userRepository.findByLogin(login).orElse(null);
		return UserMapper.INSTANCE.userToUserDto(user);
	}
	
	@Override
	@Transactional
	public String deleteUser(String login) {
		User user = userRepository.findByLogin(login).orElse(null);
		userRepository.delete(user);
		return login;
	}
	
	@Override
	public Integer editUser(EditUserDTO editUserRequest) {
		User mappedUser = EditUserMapper.INSTANCE.editUserDTOtoUser(editUserRequest);
		User editUser = userRepository.save(fromEditUserRequest(mappedUser));
		return editUser.getId();
	}
	
	@Override
	public UserDTO getUser(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		return UserMapper.INSTANCE.userToUserDto(user);
	}
}



