package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String name;
	
	@Column
	private int quantity;
	
	@Column
	private String description;
	
	@Column(name = "type_prod")
	private String typeProd;
	
	@Column
	private double price;
	
	@Column
	private String imageUrl;
	
	@Transient
	private String image;
	
	@ManyToOne
	private User user;
	
	
	public Product() {
		
	}

	public Product(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Product(int id, String name, int quantity, String description, String typeProd, double price, String imageUrl, String image, User user) {
		super();
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.description = description;
		this.typeProd = typeProd;
		this.price = price;
		this.imageUrl = imageUrl;
		this.image = image;
		this.user = user;
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


	public void setTypeProd(String typeProd) {
		this.typeProd = typeProd;
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
	

	public void setImageUrl(String image) {
		this.imageUrl = image;
	}

	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
	
	

}
