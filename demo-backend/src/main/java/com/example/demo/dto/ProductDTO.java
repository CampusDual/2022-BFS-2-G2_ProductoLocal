package com.example.demo.dto;

import java.io.File;

import javax.validation.constraints.NotEmpty;

import com.example.demo.utils.Constant;

public class ProductDTO {
	

	private int id;
	
	@NotEmpty(message = Constant.NAME_REQUIRED)
	private String name;
	

	private int quantity;
	
	
	private String description;
	
	
	private String typeProd;
	
	
	private double price;
	
	
	private String imageUrl; 
	
	
	private String image;
	
	
	private UserDTO userId;
	
	
	public ProductDTO() {
		
	}


	public ProductDTO(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}


	public ProductDTO(int id, String name, int quantity, String description, String typeProd, double price, String imageUrl, UserDTO userId) {
		super();
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.description = description;
		this.typeProd = typeProd;
		this.price = price;
		this.imageUrl = imageUrl;
		this.userId = userId;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getTypeProd() {
		return typeProd;
	}


	public void setTypeProd(String type_prod) {
		this.typeProd = type_prod;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}
	
	
	public String getImageUrl() {
		return imageUrl;
	}

	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public UserDTO getUser() {
		return userId;
	}


	public void setUser(UserDTO userId) {
		this.userId = userId;
	}
	
	
	

}

