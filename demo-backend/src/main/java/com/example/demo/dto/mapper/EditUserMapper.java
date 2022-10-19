package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.EditUserDTO;
import com.example.demo.entity.User;

@Mapper
public interface EditUserMapper {

    EditUserMapper INSTANCE = Mappers.getMapper( EditUserMapper.class );
 
    EditUserDTO userToEditUserDto(User user);
    
    List<EditUserDTO> userToUserDtoList(List<User> users);
    
    User editUserDTOtoUser(EditUserDTO userdto);


}