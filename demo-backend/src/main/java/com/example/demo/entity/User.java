package com.example.demo.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.bouncycastle.asn1.crmf.EncKeyWithID;
import org.hibernate.annotations.Formula;

import com.example.demo.utils.CipherUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User implements Serializable {
	private static final long serialVersionUID = -2185803412812655677L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(unique = true)
	private String nif;

	@Column
	private String name;

	@Column
	private String surname;
	
	@Column
	private String address;
	
	@Column
	private String city;
	
	@Column(nullable=false, unique = true)
	private String email;
	
	@Column(unique = true)
	private Integer phone;
	
	@Column 
	private String zip;

	@Column(nullable=false,unique = true)
	private String login;

	@Formula("name || ' ' || surname")
	private String fullName;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "users_profiles_map", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "profile_id") })
	private Set<Profile> profiles = new HashSet<>();

	@Column(nullable=false)
	private String password;

	public User() {
		super();
	}

	public User(String nif, String name, String surname, String login, String email) {
		super();
		this.nif = nif;
		this.name = name;
		this.surname = surname;
		this.login = login;
		this.email = email;
	}

	public User(Integer id, String nif, String name, String surname, 
			String address, String city, Integer phone, String login, String email, 
			String zip, String password, Set<Profile> profiles) {
		this(nif, name, surname, login, email);
		this.id = id;
		this.address = address;
		this.city = city;
		this.phone = phone;
		this.zip = zip;
		this.password = password;
		this.profiles = profiles;
	}
	
	public User(String email, String login, String password) {
		this.email = email;
		this.login = login;
		this.password = password;
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNif() {
		return nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public Set<Profile> getProfiles() {
		return profiles;
	}

	public Set<Section> getSections() {
		Set<Section> sections = new HashSet<>();
		for (Profile profile : profiles) {
			sections.addAll(profile.getSections());
		}
		return sections;
	}

	public void setProfiles(Set<Profile> profiles) {
		this.profiles = profiles;
	}

	public void addProfile(Profile profile) {
		profiles.add(profile);
		profile.getUsers().add(this);
	}

	public void removeProfile(Profile profile) {
		profiles.remove(profile);
		profile.getUsers().remove(this);
	}

	public void addProfiles(Set<Profile> profiles) {
		this.profiles.addAll(profiles);
		profiles.forEach(profile -> profile.getUsers().add(this));
	}

	public void removeProfiles(Set<Profile> profiles) {
		this.profiles.removeAll(profiles);
		profiles.forEach(profile -> profile.getUsers().remove(this));
	}

	public static User from(String query) {
		return new User(query, query, query, query, query);
	}

	/**
	 * Obtiene el nombre completo del usuario.
	 * 
	 * @return el nombre junto a sus apellidos.
	 */
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		CipherUtils cipher = new CipherUtils();
		this.password = cipher.encrypt(this.login, password);
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getPhone() {
		return phone;
	}

	public void setPhone(Integer phone) {
		this.phone = phone;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}
	
	
}
