package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

	Optional<User> findByLogin(String login);

	@Query("SELECT distinct u FROM User u JOIN u.profiles p WHERE p.id = :id")
	public List<User>findByProfile(@Param("id") Integer id);
	
	@Query("SELECT distinct u FROM User u JOIN u.profiles p WHERE p.id = :id AND (lower(u.login) like lower(concat('%',:query,'%')) or"
			+ " lower(u.name) like lower(concat('%',:query,'%')) or lower(u.surname) like lower(concat('%',:query,'%')) or"
			+ " lower(u.city) like lower(concat('%',:query,'%')) or lower(u.email) like lower(concat('%',:query,'%')) or"
			+ " lower(u.nif) like lower(concat('%',:query,'%')) or lower(u.zip) like lower(concat('%',:query,'%')) or"
			+ " concat(u.phone,'') like %:query%)")
	public Page<User>findByProfileIgnoreCase(@Param("id") Integer id, Pageable pageable, String query);
}
