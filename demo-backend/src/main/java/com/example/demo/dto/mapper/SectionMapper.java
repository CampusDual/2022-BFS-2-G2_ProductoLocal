package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.SectionDTO;
import com.example.demo.entity.Section;

@Mapper
public interface SectionMapper {
	
	SectionMapper INSTANCE = Mappers.getMapper( SectionMapper.class );
	 
		SectionDTO SectionToSectionDto(Section section);
	    
	    List<SectionDTO> sectionToSectionDtoList(List<Section> sections);
	    
	    Section sectionDTOtoSection(SectionDTO sectiondto);


}
