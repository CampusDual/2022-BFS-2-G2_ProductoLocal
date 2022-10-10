package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );
 
    UserDTO userToUserDto(User user);
    
    List<UserDTO> userToUserDtoList(List<User> users);
    
    User userDTOtoUser(UserDTO userdto);


}