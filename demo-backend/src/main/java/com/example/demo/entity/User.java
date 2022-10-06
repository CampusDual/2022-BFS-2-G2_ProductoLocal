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

import org.hibernate.annotations.Formula;

@Entity
@Table(name = "users")
public class User implements Serializable {
	private static final long serialVersionUID = -2185803412812655677L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String nif;

	@Column
	private String name;

	@Column
	private String surname;

	@Column(unique = true)
	private String login;

	@Formula("name || ' ' || surname1 || ' ' || surname2")
	private String fullName;

	@ManyToMany
	@JoinTable(name = "users_profiles_map", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "profile_id") })
	private Set<Profile> profiles = new HashSet<>();

	@Column
	private String password;

	public User() {
		super();
	}

	public User(String nif, String name, String surname, String login) {
		super();
		this.nif = nif;
		this.name = name;
		this.surname = surname;
		
		this.login = login;
	}

	public User(Integer id, String nif, String name, String surname, String login) {
		this(nif, name, surname, login);
		this.id = id;
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

	public void setSurname(String surname1) {
		this.surname = surname1;
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
		return new User(query, query, query, query);
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
		this.password = password;
	}
}
