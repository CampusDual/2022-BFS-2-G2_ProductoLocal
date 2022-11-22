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

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product>  {
	
	Optional<Product> findById(int id);
	
	@Query("SELECT distinct p FROM Product p WHERE p.user.login = :login")
	public List<Product>findByLogin(@Param("login") String login);
	
	@Query("SELECT distinct p FROM Product p where lower(p.user.city) like lower(concat('%',:city,'%'))")
	public Page<Product>findByCity(@Param("city") String city, Pageable pageable);
	
	@Query("SELECT distinct p FROM Product p where lower(p.user.city) like lower(concat('%',:city,'%')) and p.user.login = :producer")
	public Page<Product> findByCityProducer(@Param("city") String city, @Param("producer") String producer, Pageable pageable);

	@Query("SELECT distinct p FROM Product p where lower(p.typeProd) = lower(:type)")
	public Page<Product>findByType(@Param("type") String type, Pageable pageable);
	
	@Query("SELECT distinct p FROM Product p where lower(p.typeProd) = lower(:type) and p.user.login = :producer")
	public Page<Product>findByTypeProducer(@Param("type") String type,@Param("producer") String producer, Pageable pageable);
	
	@Query("SELECT distinct p FROM Product p where lower(p.typeProd)= lower(:typeProd) and lower(p.user.city) like lower(concat('%',:city,'%'))")
	public Page<Product>findByCityType( @Param("city") String city,@Param("typeProd") String typeProd, Pageable pageable);
	
	@Query("SELECT distinct p FROM Product p where lower(p.typeProd)= lower(:typeProd) and lower(p.user.city) like lower(concat('%',:city,'%')) and p.user.login = :producer")
	public Page<Product>findByCityTypeProducer( @Param("city") String city,@Param("typeProd") String typeProd, @Param("producer") String producer, Pageable pageable);
	
	@Query("SELECT count(*), p.typeProd FROM Product p GROUP BY p.typeProd")
	public List<Object>findData();
}
