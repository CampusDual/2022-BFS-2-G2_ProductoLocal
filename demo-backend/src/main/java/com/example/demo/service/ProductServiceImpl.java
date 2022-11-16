package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.borjaglez.springify.repository.filter.Operator;
import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.filter.impl.Filter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.mapper.ProductMapper;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class ProductServiceImpl extends AbstractDemoService implements IProductService {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public ProductDTO createProduct(ProductDTO createProductRequest) {
		Product product = ProductMapper.INSTANCE.productDtoToProduct(createProductRequest);
		Product newProduct = productRepository.save(product);
		return ProductMapper.INSTANCE.productToProductDto(newProduct);

	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> getProducts(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> products = SpecificationBuilder.selectDistinctFrom(productRepository).where(pageFilter)
				.findAll(pageFilter);
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(products.getContent());
		datares.setTotalElements((int) products.getTotalElements());
		datares.setData(productsDTO);
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> getMyProducts(AnyPageFilter pageFilter, String login) {
		checkInputParams(pageFilter);
		User user = userRepository.findByLogin(login).get();
		Filter filter = new Filter("user", Operator.EQUAL, user.getId());
		Page<Product> products = SpecificationBuilder.selectDistinctFrom(productRepository).where(filter)
				.where(pageFilter).findAll(pageFilter);
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(products.getContent());
		datares.setTotalElements((int) products.getTotalElements());
		datares.setData(productsDTO);
		return datares;
	}

	@Override
	public List<ProductDTO> findAll() {
		List<Product> productList = (List<Product>) productRepository.findAll();
		return ProductMapper.INSTANCE.productToProductDtoList(productList);
	}

	@Override
	@Transactional
	public Integer deleteProduct(Integer id) {
		productRepository.deleteById(id);
		return id;
	}

	@Override
	public Integer editProduct(ProductDTO editProductRequest) {
		Product mappedProduct = ProductMapper.INSTANCE.productDtoToProduct(editProductRequest);
		Product editProduct = productRepository.save(fromEditProductRequest(mappedProduct));
		return editProduct.getId();
	}

	@Override
	public ProductDTO getProduct(Integer id) {
		Product product = productRepository.findById(id).orElse(null);
		return ProductMapper.INSTANCE.productToProductDto(product);
	}

	@Override
	public List<ProductDTO> findByUser(String login) {
		List<Product> products = this.productRepository.findByLogin(login);
		return ProductMapper.INSTANCE.productToProductDtoList(products);
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findCities(String city, AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> cities = productRepository.findByCity(city, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(cities.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) cities.getTotalElements());
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findCitiesProducer(String city, String producer,AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> cities = productRepository.findByCityProducer(city, producer, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(cities.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) cities.getTotalElements());
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findTypes(String typeProd, AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> types = productRepository.findByType(typeProd, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(types.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) types.getTotalElements());
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findTypesProducer(String typeProd, String producer,
			AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> types = productRepository.findByTypeProducer(typeProd, producer, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(types.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) types.getTotalElements());
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findByCityType(String city, String typeProd,
			AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> types = productRepository.findByCityType(city, typeProd, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(types.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) types.getTotalElements());
		return datares;
	}

	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ProductDTO>> findByCityTypeProducer(String city, String typeProd,
			String producer, AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Product> types = productRepository.findByCityTypeProducer(city, typeProd, producer, pageFilter.toPageable());
		DataSourceRESTResponse<List<ProductDTO>> datares = new DataSourceRESTResponse<>();
		List<ProductDTO> productsDTO = ProductMapper.INSTANCE.productToProductDtoList(types.getContent());
		datares.setData(productsDTO);
		datares.setTotalElements((int) types.getTotalElements());
		return datares;
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Object> findData() {
		return this.productRepository.findData();
	}

}
