package com.example.demo.utils;

public class Constant {
	//Contact error
	public static final String NAME_REQUIRED ="NAME_REQUIRED";
	public static final String ID_REQUIRED ="ID_REQUIRED";
	public static final String SURNAME1_REQUIRED ="SURNAME1_REQUIRED";
	public static final String SURNAME2_REQUIRED ="SURNAME2_REQUIRED";
	public static final String SURNAME_REQUIRED ="SURNAME_REQUIRED";
	public static final String PHONE_REQUIRED ="PHONE_REQUIRED";
	public static final String PHONE_INVALID ="PHONE_INVALID";
	public static final String PHONE_ALREADY_EXISTS ="PHONE_ALREADY_EXISTS";
	public static final String EMAIL_REQUIRED ="EMAIL_REQUIRED";
	public static final String EMAIL_INVALID ="EMAIL_INVALID";
	public static final String CONTACT_NOT_EXISTS ="CONTACT_NOT_EXISTS";
	public static final String CONTACT_ALREADY_EXISTS ="CONTACT_ALREADY_EXISTS";
	public static final String CONTACT_CONSTRAINT_VIOLATION ="CONTACT_CONSTRAINT_VIOLATION";
	public static final String UNKNOWN_ERROR ="UNKNOWN_ERROR";
	
	//Contact message
	public static final String CONTACT_CREATE_SUCCESS ="CONTACT_CREATE_SUCCESS";
	public static final String CONTACT_NOT_CREATED ="CONTACT_NOT_CREATED";
	public static final String CONTACT_EDIT_SUCCESS ="CONTACT_EDIT_SUCCESS";
	public static final String CONTACT_NOT_EDIT ="CONTACT_NOT_EDIT";
	public static final String CONTACT_DELETE_SUCCESS ="CONTACT_DELETE_SUCCESS";
	public static final String CONTACT_NOT_DELETE ="CONTACT_NOT_DELETE";
	
	//User message
	public static final String USER_CREATE_SUCCESS ="USER_CREATE_SUCCESS";
	public static final String USER_EDIT_SUCCESS ="USER_EDIT_SUCCESS";
	public static final String USER_DELETE_SUCCESS ="USER_DELETE_SUCCESS";
	public static final String USER_ADDRESS_REQUIRED = "USER_ADDRESS_REQUIRED";
	public static final String USER_CITYNAME_REQUIRED = "USER_CITYNAME_REQUIRED";
	public static final String USER_EMAIL_REQUIRED = "USER_EMAIL_REQUIRED";
	public static final String USER_PHONE_REQUIRED = "USER_PHONE_REQUIRED";
	public static final String USER_ZIP_REQUIRED="USER_ZIP_REQUIRED";
	public static final String USER_PASSWORD_REQUIRED = "USER_PASSWORD_REQUIRED";
	public static final String USER_FULLNAME_REQUIRED="USER_FULLNAME_REQUIRED";
	
	//Product messages
	public static final String PRODUCT_NOT_CREATED = "PRODUCT_NOT_CREATED";
	public static final String PRODUCT_EDIT_SUCCESS = "PRODUCT_EDIT_SUCCESS";
	public static final String PRODUCT_NOT_EDIT = "PRODUCT_NOT_EDIT";
	public static final String PRODUCT_NOT_EXISTS = "PRODUCT_NOT_EXISTS";
	public static final String PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
	public static final String PRODUCT_SHOW_SUCCESS = "PRODUCT_SHOW_SUCCESS";
	public static final String PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
	
	//User error
	public static final String LOGIN_REQUIRED ="LOGIN_REQUIRED";
	public static final String USER_NOT_EDIT ="USER_NOT_EDITED";
	public static final String NIF_REQUIRED ="NIF_REQUIRED";
	public static final String LOGIN_EXISTS ="LOGIN_EXISTS";
	public static final String NIF_MALFORMED ="NIF_MALFORMED";
	public static final String USER_NOT_EXISTS ="USER_NOT_EXISTS";
	public static final String NO_SECTIONS_ACCESS ="NO_SECTIONS_ACCESS";
	public static final String USER_CONSTRAINT_VIOLATION ="USER_CONSTRAINT_VIOLATION";
	public static final String USER_NOT_CREATED = "USER_NOT_CREATED";
	public static final String NIF_ALREADY_EXISTS ="NIF_ALREADY_EXISTS";
	public static final String EMAIL_ALREADY_EXISTS ="EMAIL_ALREADY_EXISTS";
	public static final String LOGIN_ALREADY_EXISTS ="LOGIN_ALREADY_EXISTS";
	
	//Profile error
	public static final String PROFILE_CONSTRAINT_VIOLATION ="PROFILE_CONSTRAINT_VIOLATION";
	
	//Common error
	public static final String ID_NOT_EXISTS ="ID_NOT_EXISTS";
	public static final String UNAUTHORIZED_USER ="UNAUTHORIZED_USER";
	public static final String SIGNATURE_NOT_PENDING ="SIGNATURE_NOT_PENDING";
	public static final String DATABASE_QUERY_ERROR ="DATABASE_QUERY_ERROR";
	
	//pagination error
	public static final String PAGE_INDEX_REQUIRED ="PAGE_INDEX_REQUIRED";
	public static final String PAGE_SIZE_REQUIRED ="PAGE_SIZE_REQUIRED";
	
	public static final String MESSAGE = "responseMessage";
	public static final String RESPONSE_CODE = "responseCode";
	public static final String ERROR = "errors";
	public static final String PHONE_ERROR ="contacts_phone_key";
	public static final String USER_PHONE_ERROR ="users_phone_key";
	public static final String NIF_ERROR ="users_nif_key";
	public static final String EMAIL_ERROR ="users_email_key";
	public static final String LOGIN_ERROR ="users_login_key";
    public static final String PROFILE_REQUIRED = "PROFILE_REQUIRED";
    
    
    //Image backend path
    public static final String BASE64HEADER = "data:image/jpeg;base64,";
    public static final String IMG_PATH = "./src/main/resources/images/";
	
	
	
	

}
