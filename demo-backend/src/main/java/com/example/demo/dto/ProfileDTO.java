package com.example.demo.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class ProfileDTO {
	
	private Integer id;
	
	private String description;
	
	private String name;
	
	private List<SectionDTO> sections = new ArrayList<>();
	
	private Set<UserDTO> users = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<SectionDTO> getSections() {
		return sections;
	}

	public void setSections(List<SectionDTO> sections) {
		this.sections = sections;
	}

	public Set<UserDTO> getUsers() {
		return users;
	}

	public void setUsers(Set<UserDTO> users) {
		this.users = users;
	}


	
	

}
