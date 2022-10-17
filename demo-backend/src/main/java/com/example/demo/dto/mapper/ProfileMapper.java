package com.example.demo.dto.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.ProfileDTO;
import com.example.demo.entity.Profile;

@Mapper
public interface ProfileMapper {
	
	ProfileMapper INSTANCE = Mappers.getMapper( ProfileMapper.class);
	 
	ProfileDTO profileToProfileDto(Profile profile);
    
    List<ProfileDTO> profileToProfileDtoList(List<Profile> profiles);
    
    Profile profileDTOtoProfile(ProfileDTO profiledto);


}


