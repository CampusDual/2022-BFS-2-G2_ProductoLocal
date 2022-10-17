package com.example.demo.dto;

import java.util.HashSet;
import java.util.Set;

public class SectionDTO {
	
	private Integer id;
	
	private String name;
	
	private String description;
	
	private String alias;

	private Set<ProfileDTO> profiles = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public Set<ProfileDTO> getProfiles() {
		return profiles;
	}

	public void setProfiles(Set<ProfileDTO> profiles) {
		this.profiles = profiles;
	}


}
