package com.example.demo.service;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.mapper.UserMapper;
import com.example.demo.entity.Section;
import com.example.demo.entity.User;
import com.example.demo.exception.DemoException;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.Constant;


@Service
public class UserServiceImpl implements IUserService {

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
	public UserDTO createUser(userDTO createUserRequest) {
		User user = UserMapper.INSTANCE.userDTOtoUser(createUserRequest);
		User newUser = userRepository.save(user);
		return UserMapper.INSTANCE.userToUserDto(newUser);
	}
}
