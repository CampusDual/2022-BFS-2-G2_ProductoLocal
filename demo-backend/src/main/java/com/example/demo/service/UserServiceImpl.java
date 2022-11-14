package com.example.demo.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.mapper.EditUserMapper;
import com.example.demo.dto.mapper.UserMapper;
import com.example.demo.entity.Profile;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;


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
	
	@Override
	public List<UserDTO> findAll() {
		List<User> userList = (List<User>)userRepository.findAll();
		return UserMapper.INSTANCE.userToUserDtoList(userList);
	}
	
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<UserDTO>> findProducers(int id, AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		String query = "";
		if(pageFilter.getValue() != null) {
			query = pageFilter.getValue().toString();
		}
		Page<User> producers = userRepository.findByProfileIgnoreCase(id, pageFilter.toPageable(), query);
		DataSourceRESTResponse<List<UserDTO>> datares = new DataSourceRESTResponse<>();
		List<UserDTO> usersDTO = UserMapper.INSTANCE.userToUserDtoList(producers.getContent());
		datares.setData(usersDTO);
		datares.setTotalElements((int) producers.getTotalElements());
		return datares;
	}

	@Override
	public List<UserDTO> findProducers() {
		List<User> userList = (List<User>)userRepository.findAll();
		List<User> producerList = userRepository.findByProfile(2);
		return UserMapper.INSTANCE.userToUserDtoList(producerList);
	}
}



