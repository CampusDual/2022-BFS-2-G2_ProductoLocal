package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="products")
public class Product {
	
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String name;
	
	@Column
	private int quantity;
	
	@Column
	private String description;
	
	@Column
	private String type_prod;
	
	@Column
	private double price;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private int user_id;
	
	
	public Product() {
		
	}


	public Product(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}


	public Product(int id, String name, int quantity, String description, String type_prod, double price, int user_id) {
		super();
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.description = description;
		this.type_prod = type_prod;
		this.price = price;
		this.user_id = user_id;
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


	public String getType_prod() {
		return type_prod;
	}


	public void setType_prod(String type_prod) {
		this.type_prod = type_prod;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public int getUser_id() {
		return user_id;
	}


	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	
	

}
