package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product>  {
	
	Optional<Product> findById(int id);
	
	@Query("SELECT distinct p FROM Product p WHERE p.user.login = :login")
	public List<Product>findByLogin(@Param("login") String login);
	
	@Query("SELECT distinct p FROM Product p where p.user.city = :city")
	public Page<Product>findByCity(@Param("city") String city, Pageable pageable);
	
	@Query("SELECT distinct p FROM Product p where p.typeProd= :typeProd")
	public Page<Product>findByType(@Param("typeProd") String typeProd, Pageable pageable);

}
