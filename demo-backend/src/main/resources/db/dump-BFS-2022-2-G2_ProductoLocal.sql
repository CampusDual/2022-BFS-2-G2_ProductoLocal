--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-0+deb10u1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-02-02 13:07:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Fullstack_2022_2_G2";
--
-- TOC entry 2970 (class 1262 OID 202898)
-- Name: Fullstack_2022_2_G2; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "Fullstack_2022_2_G2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect "Fullstack_2022_2_G2"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 2971 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 205 (class 1259 OID 204511)
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    quantity integer,
    description character varying(20),
    type_prod character varying(50),
    price double precision,
    user_id integer,
    image_url character varying(255)
);


--
-- TOC entry 204 (class 1259 OID 204509)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 204
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 197 (class 1259 OID 203335)
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 196 (class 1259 OID 203333)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2973 (class 0 OID 0)
-- Dependencies: 196
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 198 (class 1259 OID 203344)
-- Name: profiles_sections_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles_sections_map (
    profile_id integer NOT NULL,
    section_id integer NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 203349)
-- Name: sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    alias character varying(255),
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 199 (class 1259 OID 203347)
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2974 (class 0 OID 0)
-- Dependencies: 199
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- TOC entry 202 (class 1259 OID 203360)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    name character varying(255),
    nif character varying(9),
    password character varying(255) NOT NULL,
    address character varying(255),
    city character varying(255),
    email character varying(255) NOT NULL,
    phone integer,
    zip character varying(5),
    surname character varying(255)
);


--
-- TOC entry 201 (class 1259 OID 203358)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2975 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 203 (class 1259 OID 203369)
-- Name: users_profiles_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_profiles_map (
    user_id integer NOT NULL,
    profile_id integer NOT NULL
);


--
-- TOC entry 2808 (class 2604 OID 204514)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2805 (class 2604 OID 203338)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 2806 (class 2604 OID 203352)
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- TOC entry 2807 (class 2604 OID 203363)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2964 (class 0 OID 204511)
-- Dependencies: 205
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (185, 'pepinos', 22, 'Kilograms', 'Vegetables', 1.80000000000000004, 279, '185.jpg');
INSERT INTO public.products VALUES (204, 'grelos', 1, 'Units', 'Vegetables', 2, 293, '204.jpg');
INSERT INTO public.products VALUES (187, 'zumos 100% naturales 1L', 30, 'Units', 'Drinks', 3.75, 275, '187.jpg');
INSERT INTO public.products VALUES (103, 'nueces peladas', 8, 'Kilograms', 'Others', 8.75, 275, '103.jpg');
INSERT INTO public.products VALUES (183, 'uvas', 15, 'Kilograms', 'Fruits', 2.45000000000000018, 273, '183.jpg');
INSERT INTO public.products VALUES (83, 'Sandías', 24, 'Units', 'Fruits', 2.39999999999999991, 266, '83.jpg');
INSERT INTO public.products VALUES (184, 'pimiento rojo', 35, 'Kilograms', 'Vegetables', 2.45000000000000018, 279, '184.jpg');
INSERT INTO public.products VALUES (191, 'manzanas', 20, 'Kilograms', 'Fruits', 1.60000000000000009, 266, '191.jpg');
INSERT INTO public.products VALUES (198, 'paraguayos', 20, 'Kilograms', 'Fruits', 1.39999999999999991, 275, '198.jpg');
INSERT INTO public.products VALUES (84, 'Zumos de frutas', 14, 'Liters', 'Drinks', 4.5, 266, '84.jpg');
INSERT INTO public.products VALUES (85, 'Tomates', 17, 'Kilograms', 'Vegetables', 3.75, 267, '85.jpg');
INSERT INTO public.products VALUES (86, 'cebollas', 26, 'Kilograms', 'Vegetables', 2, 267, '86.jpg');
INSERT INTO public.products VALUES (87, 'fresas', 14, 'Kilograms', 'Fruits', 8.5, 266, '87.jpg');
INSERT INTO public.products VALUES (88, 'guisantes', 8, 'Kilograms', 'Legumes', 7.90000000000000036, 267, '88.jpg');
INSERT INTO public.products VALUES (89, 'judias verdes', 12, 'Kilograms', 'Vegetables', 2.79999999999999982, 267, '89.jpg');
INSERT INTO public.products VALUES (90, 'mandarinas', 34, 'Kilograms', 'Fruits', 2.29999999999999982, 266, '90.jpg');
INSERT INTO public.products VALUES (91, 'champiñones', 15, 'Kilograms', 'Vegetables', 5.5, 268, '91.jpg');
INSERT INTO public.products VALUES (92, 'setas silvestres variado', 6, 'Kilograms', 'Others', 10.5, 268, '92.jpg');
INSERT INTO public.products VALUES (93, 'platanos', 130, 'Units', 'Fruits', 0.299999999999999989, 266, '93.jpg');
INSERT INTO public.products VALUES (94, 'platanos', 36, 'Kilograms', 'Fruits', 1, 266, '94.jpg');
INSERT INTO public.products VALUES (95, 'huevos', 87, 'Units', 'Others', 0.200000000000000011, 268, '95.jpg');
INSERT INTO public.products VALUES (96, 'miel', 27, 'Kilograms', 'Others', 11.1999999999999993, 268, '96.jpg');
INSERT INTO public.products VALUES (97, 'jalea real', 600, 'Grams', 'Others', 0.349999999999999978, 268, '97.jpg');
INSERT INTO public.products VALUES (98, 'remolachas', 25, 'Kilograms', 'Vegetables', 3.25, 267, '98.jpg');
INSERT INTO public.products VALUES (99, 'uvas tintas', 78, 'Kilograms', 'Fruits', 2.14999999999999991, 269, '99.jpg');
INSERT INTO public.products VALUES (100, 'kiwis', 16, 'Kilograms', 'Fruits', 4.75, 275, '100.jpg');
INSERT INTO public.products VALUES (112, 'mazorcas de maiz', 135, 'Units', 'Vegetables', 0.599999999999999978, 267, '112');
INSERT INTO public.products VALUES (102, 'Manzanas Golden', 23, 'Kilograms', 'Fruits', 1.69999999999999996, 273, '102.jpg');
INSERT INTO public.products VALUES (104, 'manzanas rojas', 16, 'Kilograms', 'Fruits', 0.849999999999999978, 275, '104.jpg');
INSERT INTO public.products VALUES (101, 'manzanas granny', 23, 'Kilograms', 'Fruits', 1.14999999999999991, 275, '101.jpg');
INSERT INTO public.products VALUES (105, 'ramas de romero', 85, 'Units', 'Others', 0.450000000000000011, 267, '105.jpg');
INSERT INTO public.products VALUES (106, 'haba blanca', 12, 'Kilograms', 'Legumes', 8.80000000000000071, 267, '106.jpg');
INSERT INTO public.products VALUES (107, 'zanahorias', 26, 'Kilograms', 'Vegetables', 1.85000000000000009, 267, '107.jpg');
INSERT INTO public.products VALUES (108, 'uvas', 14, 'Kilograms', 'Fruits', 2.29999999999999982, 266, '108.jpg');
INSERT INTO public.products VALUES (109, 'naranjas', 32, 'Kilograms', 'Fruits', 1.25, 276, '109.jpg');
INSERT INTO public.products VALUES (110, 'zumo recien exprimido', 15, 'Liters', 'Drinks', 3.5, 276, '110.jpg');
INSERT INTO public.products VALUES (111, 'patatas', 46, 'Kilograms', 'Vegetables', 0.900000000000000022, 267, '111.jpg');
INSERT INTO public.products VALUES (113, 'platanos', 30, 'Kilograms', 'Fruits', 1.85000000000000009, 275, '113.jpg');
INSERT INTO public.products VALUES (114, 'almendras granel', 10, 'Kilograms', 'Fruits', 10.5, 275, '114.jpg');
INSERT INTO public.products VALUES (115, 'castañas', 30, 'Kilograms', 'Fruits', 6.20000000000000018, 275, '115.jpg');
INSERT INTO public.products VALUES (116, 'piñas', 35, 'Units', 'Fruits', 2.25, 275, '116.jpg');
INSERT INTO public.products VALUES (117, 'caja variado frutas temporada 5Kg', 20, 'Units', 'Fruits', 13.5, 275, '117.jpg');
INSERT INTO public.products VALUES (118, 'tomates cherry pera', 20, 'Kilograms', 'Vegetables', 6, 275, '118.jpg');
INSERT INTO public.products VALUES (119, 'Cabezas de ajo', 80, 'Units', 'Vegetables', 0.349999999999999978, 275, '119.jpg');
INSERT INTO public.products VALUES (121, 'calabacines', 35, 'Kilograms', 'Vegetables', 1.89999999999999991, 267, '121.jpg');
INSERT INTO public.products VALUES (122, 'Patatas', 21, 'Kilograms', 'Legumes', 1, 277, '122.jpg');
INSERT INTO public.products VALUES (124, 'Leche', 1, 'Liters', 'Dairy', 0.859999999999999987, 277, '124.jpg');
INSERT INTO public.products VALUES (125, 'sandias', 25, 'Units', 'Fruits', 9.5, 275, '125.jpg');
INSERT INTO public.products VALUES (126, 'racimo uvas', 40, 'Units', 'Fruits', 2.25, 275, '126.jpg');
INSERT INTO public.products VALUES (127, 'nueces', 14, 'Kilograms', 'Others', 7.90000000000000036, 275, '127.jpg');
INSERT INTO public.products VALUES (128, 'limones', 55, 'Kilograms', 'Fruits', 1.75, 275, '128.jpg');
INSERT INTO public.products VALUES (129, 'patatas', 30, 'Kilograms', 'Vegetables', 1.19999999999999996, 276, '129.jpg');
INSERT INTO public.products VALUES (130, 'pimientos', 50, 'Units', 'Vegetables', 1.44999999999999996, 267, '130.jpg');
INSERT INTO public.products VALUES (133, 'naranjas', 40, 'Kilograms', 'Fruits', 1.39999999999999991, 266, '133.jpg');
INSERT INTO public.products VALUES (186, 'platanos', 15, 'Kilograms', 'Fruits', 1.60000000000000009, 273, '186.jpg');
INSERT INTO public.products VALUES (188, 'pepinos', 10, 'Kilograms', 'Vegetables', 2.10000000000000009, 267, '188.jpg');
INSERT INTO public.products VALUES (189, 'lentejas ', 10, 'Kilograms', 'Legumes', 2.10000000000000009, 277, '189.jpg');
INSERT INTO public.products VALUES (190, 'maiz', 65, 'Kilograms', 'Vegetables', 4.59999999999999964, 279, '190.jpg');
INSERT INTO public.products VALUES (220, 'grelos', 5, 'Units', 'Vegetables', 2, 267, '220');
INSERT INTO public.products VALUES (131, 'pimiento italiano', 90, 'Units', 'Vegetables', 0.349999999999999978, 267, '131.jpg');
INSERT INTO public.products VALUES (132, 'kiwis', 25, 'Kilograms', 'Fruits', 4.45000000000000018, 266, '132.jpg');
INSERT INTO public.products VALUES (135, 'moras silvestres (100gr)', 15, 'Units', 'Fruits', 2.5, 268, '135.jpg');
INSERT INTO public.products VALUES (138, 'cesta de flores decoración', 50, 'Units', 'Others', 50, 278, '138.jpg');
INSERT INTO public.products VALUES (141, 'almendras', 20, 'Kilograms', 'Others', 12.25, 267, '141.jpg');
INSERT INTO public.products VALUES (142, 'Licor café', 30, 'Liters', 'Drinks', 7.5, 268, '142.jpg');
INSERT INTO public.products VALUES (144, 'calabacines', 30, 'Kilograms', 'Vegetables', 1.64999999999999991, 279, '144.jpg');
INSERT INTO public.products VALUES (145, 'alubia roja', 50, 'Kilograms', 'Legumes', 4.25, 279, '145.jpg');
INSERT INTO public.products VALUES (146, 'fresas', 40, 'Kilograms', 'Fruits', 7.75, 275, '146.jpg');
INSERT INTO public.products VALUES (147, 'lechuga', 35, 'Units', 'Vegetables', 1.19999999999999996, 267, '147.jpg');
INSERT INTO public.products VALUES (148, 'melocotones', 12, 'Kilograms', 'Fruits', 5.75, 275, '148.jpg');
INSERT INTO public.products VALUES (149, 'piñas', 20, 'Units', 'Fruits', 2.10000000000000009, 266, '149.jpg');
INSERT INTO public.products VALUES (151, 'aceite', 20, 'Liters', 'Others', 4.5, 281, '151.jpg');
INSERT INTO public.products VALUES (153, 'calabazas 2kg', 20, 'Units', 'Vegetables', 1.85000000000000009, 267, '153.jpg');
INSERT INTO public.products VALUES (154, 'garbanzos', 16, 'Kilograms', 'Legumes', 2.10000000000000009, 267, '154.jpg');
INSERT INTO public.products VALUES (155, 'lechugas', 20, 'Units', 'Vegetables', 1.35000000000000009, 281, '155.jpg');
INSERT INTO public.products VALUES (156, 'patatas', 35, 'Kilograms', 'Vegetables', 0.849999999999999978, 281, '156.jpg');
INSERT INTO public.products VALUES (157, 'arándanos 200gr', 20, 'Units', 'Fruits', 2.20000000000000018, 275, '157.jpg');
INSERT INTO public.products VALUES (158, 'kiwis', 23, 'Kilograms', 'Fruits', 4.90000000000000036, 282, '158.jpg');
INSERT INTO public.products VALUES (159, 'castañas', 10, 'Kilograms', 'Others', 5.5, 282, '159.jpg');
INSERT INTO public.products VALUES (160, 'cebollas', 20, 'Kilograms', 'Vegetables', 1.89999999999999991, 276, '160.jpg');
INSERT INTO public.products VALUES (161, 'chiles serranos', 10, 'Kilograms', 'Vegetables', 3.75, 267, '161.jpg');
INSERT INTO public.products VALUES (162, 'cesta flores grande', 15, 'Units', 'Others', 70, 278, '162.jpg');
INSERT INTO public.products VALUES (163, 'vino mencía valdeorras', 40, 'Liters', 'Drinks', 4.5, 269, '163.jpg');
INSERT INTO public.products VALUES (164, 'uva blanca godello', 45, 'Kilograms', 'Fruits', 3.25, 269, '164.jpg');
INSERT INTO public.products VALUES (165, 'Licor café', 25, 'Liters', 'Drinks', 6.5, 284, '165.jpg');
INSERT INTO public.products VALUES (192, 'judias', 25, 'Kilograms', 'Vegetables', 2.25, 279, '192.jpg');
INSERT INTO public.products VALUES (193, 'melon 2kg', 8, 'Units', 'Fruits', 7.59999999999999964, 276, '193.jpg');
INSERT INTO public.products VALUES (194, 'leche', 70, 'Liters', 'Dairy', 1.19999999999999996, 291, '194.jpg');
INSERT INTO public.products VALUES (195, 'huevos docena', 16, 'Units', 'Others', 3, 292, '195.jpg');
INSERT INTO public.products VALUES (196, 'queso 300gr', 25, 'Units', 'Dairy', 3.39999999999999991, 291, '196.jpg');
INSERT INTO public.products VALUES (197, 'platanos', 15, 'Kilograms', 'Fruits', 1.39999999999999991, 282, '197.jpg');
INSERT INTO public.products VALUES (199, 'tomate', 12, 'Kilograms', 'Vegetables', 3.25, 281, '199.jpg');


--
-- TOC entry 2956 (class 0 OID 203335)
-- Dependencies: 197
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles VALUES (1, 'Acceso general', 'Administrador');
INSERT INTO public.profiles VALUES (2, 'Acceso de productores', 'Productor');
INSERT INTO public.profiles VALUES (3, 'Acceso de cliente', 'Cliente');


--
-- TOC entry 2957 (class 0 OID 203344)
-- Dependencies: 198
-- Data for Name: profiles_sections_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles_sections_map VALUES (1, 1);
INSERT INTO public.profiles_sections_map VALUES (2, 1);
INSERT INTO public.profiles_sections_map VALUES (1, 2);
INSERT INTO public.profiles_sections_map VALUES (1, 3);
INSERT INTO public.profiles_sections_map VALUES (1, 4);
INSERT INTO public.profiles_sections_map VALUES (3, 1);
INSERT INTO public.profiles_sections_map VALUES (1, 6);
INSERT INTO public.profiles_sections_map VALUES (2, 7);
INSERT INTO public.profiles_sections_map VALUES (2, 8);
INSERT INTO public.profiles_sections_map VALUES (2, 4);
INSERT INTO public.profiles_sections_map VALUES (2, 5);
INSERT INTO public.profiles_sections_map VALUES (1, 9);
INSERT INTO public.profiles_sections_map VALUES (1, 10);
INSERT INTO public.profiles_sections_map VALUES (3, 11);
INSERT INTO public.profiles_sections_map VALUES (1, 14);
INSERT INTO public.profiles_sections_map VALUES (2, 13);
INSERT INTO public.profiles_sections_map VALUES (3, 12);


--
-- TOC entry 2959 (class 0 OID 203349)
-- Dependencies: 200
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sections VALUES (1, 'CONTACTS', 'Perfiles y secciones a los que puede acceder cada perfil.', 'Contactos');
INSERT INTO public.sections VALUES (4, 'EDIT_PRODUCTS', 'Editar productos', 'Edit_Products');
INSERT INTO public.sections VALUES (3, 'SHOW_PRODUCTS_ADMIN', 'Mostrar productos', 'Show_Products_Admin');
INSERT INTO public.sections VALUES (2, 'CREATE_PRODUCTS_ADMIN', 'Productos de productor', 'Create_Products_Admin');
INSERT INTO public.sections VALUES (5, 'DELETE_PRODUCTS', 'Borrar productos', 'Delete_Products');
INSERT INTO public.sections VALUES (6, 'DELETE_PRODUCTS_ADMIN', 'Borrar productos (ADministrador)', 'Delete_Products_Admin');
INSERT INTO public.sections VALUES (7, 'SHOW_PRODUCTS', 'Mostrar productos de productor', 'Show_Products');
INSERT INTO public.sections VALUES (8, 'CREATE_PRODUCTS', 'Crear productos', 'Create_Products');
INSERT INTO public.sections VALUES (9, 'MANAGE_USERS', 'Gestionar de usuarios', 'Manage_Users');
INSERT INTO public.sections VALUES (10, 'SHOW_PRODUCERS', 'Mostrar lista de productores', 'Show_Producers');
INSERT INTO public.sections VALUES (11, 'GET_PRODUCTS_CLIENT', 'Mostar lista de productos para clientes', 'Get_products_client');
INSERT INTO public.sections VALUES (12, 'CLIENT', 'Genérico para usuarios de tipo cliente', 'client');
INSERT INTO public.sections VALUES (13, 'PRODUCER', 'Genérico para usuarios de tipo productor', 'producer');
INSERT INTO public.sections VALUES (14, 'ADMIN', 'Genérico para usuarios de tipo administrador', 'admin');


--
-- TOC entry 2961 (class 0 OID 203360)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (283, 'cliente', NULL, NULL, '2xLU8kb+0//bBU9CiVdF9Q==', NULL, NULL, 'cliente@mail.com', NULL, '', NULL);
INSERT INTO public.users VALUES (1, 'demo', 'demo', '00000000A', 'C5rCRzh9s2DPHYrnnLS/eg==', '', 'Santiago', 'demo@email.com', 666000666, '66666', 'demo');
INSERT INTO public.users VALUES (291, 'elisav', 'elisa', NULL, 'lWfW6R6rjBtQgkp/6ZBwOw==', NULL, 'sarria', 'lacteosvarela@email.com', NULL, NULL, 'varela');
INSERT INTO public.users VALUES (292, 'merce', 'Mercedes', NULL, 'RxCYbofiNB9BbWNYs5JCvQ==', NULL, 'Ortigueira', 'mercedes86@email.com', NULL, NULL, 'Añón Silva');
INSERT INTO public.users VALUES (293, 'Xoan', NULL, NULL, 'py5ixjaIqQ/N/raF+6yQZg==', NULL, 'Fisterra', 'xoan@gmail.com', NULL, NULL, NULL);
INSERT INTO public.users VALUES (268, 'andrescc', 'Andrés', NULL, '5IOb5kMUoqS2ZKcvULCekQ==', NULL, 'Villalba', 'andresc83@email.com', 987789876, NULL, 'Carro Castiñeira');
INSERT INTO public.users VALUES (274, 'client', NULL, NULL, 'D00hRxKSQ0CQ2CrP6E0YuQ==', NULL, NULL, 'client@email.com', NULL, NULL, NULL);
INSERT INTO public.users VALUES (273, 'FrutasPaco', 'José Francisco', '12345678G', '5KvBrI7lM4SeNzG2tUFKvA==', 'Ctra. de San Xoán, 125', 'Vigo', 'info@frutaspaco.com', NULL, '36315', 'Rodríguez');
INSERT INTO public.users VALUES (281, 'albarojo', 'alba', NULL, 'SvyyisCqWzrH30LfQn4c1Q==', NULL, 'A Coruña', 'albars@email.com', 987654321, '15172', 'rojo suarez');
INSERT INTO public.users VALUES (276, 'juanrey', 'Juan', NULL, '2hHnabEyJnjLWFf1eupGJw==', NULL, 'Sada', 'juansd@email.com', 981467932, NULL, 'Rey Fdez');
INSERT INTO public.users VALUES (275, 'frutas carmen', 'Carmen Maria', NULL, 'bJyzaCdATxIQLj8Mv44vaQ==', NULL, 'Muros', 'frutascarmen@email.com', NULL, NULL, 'Nogueira ');
INSERT INTO public.users VALUES (266, 'MarcosV', 'Marcos', NULL, 'tP1usGeYJee8eIJ8Tnbw9Q==', NULL, 'Vigo', 'marcosclvigo@email.com', NULL, NULL, NULL);
INSERT INTO public.users VALUES (269, 'joseval68', 'Jose ', NULL, 'eYJNNHumLZyoinLPZTIKHA==', NULL, 'Barco de Valdeorras', 'jose68mt@email.com', NULL, NULL, 'MT');
INSERT INTO public.users VALUES (282, 'jandres', 'jose andres', NULL, 'fw9RdirhXea5AWtV+dA7xA==', NULL, 'Chantada', 'andresj@email.com', NULL, NULL, NULL);
INSERT INTO public.users VALUES (284, 'licoresRG', 'Rodrigo', NULL, '+SDjWjZ5kkSu/vFiqKEz3w==', NULL, 'Cambados', 'rodrigogg@email.com', NULL, NULL, 'Garcia');
INSERT INTO public.users VALUES (278, 'decorina', 'Corina', NULL, 'bXWL60rtWtacifVEFLRbwQ==', NULL, 'Foz', 'decorina@email.com', NULL, NULL, 'Garcia Vila');
INSERT INTO public.users VALUES (279, 'raulm', 'Raul', NULL, 'o0rdUoO8GupqUiYWo1W9gw==', NULL, 'Monforte', 'raulmp@email.com', NULL, NULL, NULL);
INSERT INTO public.users VALUES (267, 'LaHuertadeLucia', 'Lucía', '12345678Z', 'TAxN0RoenJhb16wIvwcw/w==', '', 'Vigo', 'lahuertadelucia@email.com', 606953684, '36200', 'Fernández');
INSERT INTO public.users VALUES (277, 'CasaMaria', NULL, NULL, '0HBYwjItugfZevtl/SxZxA==', NULL, 'O Rosal', 'venta@casamaria.com', 987789987, NULL, NULL);


--
-- TOC entry 2962 (class 0 OID 203369)
-- Dependencies: 203
-- Data for Name: users_profiles_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users_profiles_map VALUES (1, 1);
INSERT INTO public.users_profiles_map VALUES (266, 2);
INSERT INTO public.users_profiles_map VALUES (267, 2);
INSERT INTO public.users_profiles_map VALUES (268, 2);
INSERT INTO public.users_profiles_map VALUES (269, 2);
INSERT INTO public.users_profiles_map VALUES (273, 2);
INSERT INTO public.users_profiles_map VALUES (274, 3);
INSERT INTO public.users_profiles_map VALUES (275, 2);
INSERT INTO public.users_profiles_map VALUES (276, 2);
INSERT INTO public.users_profiles_map VALUES (277, 2);
INSERT INTO public.users_profiles_map VALUES (278, 2);
INSERT INTO public.users_profiles_map VALUES (279, 2);
INSERT INTO public.users_profiles_map VALUES (281, 2);
INSERT INTO public.users_profiles_map VALUES (282, 2);
INSERT INTO public.users_profiles_map VALUES (283, 3);
INSERT INTO public.users_profiles_map VALUES (284, 2);
INSERT INTO public.users_profiles_map VALUES (291, 2);
INSERT INTO public.users_profiles_map VALUES (292, 2);
INSERT INTO public.users_profiles_map VALUES (293, 3);


--
-- TOC entry 2976 (class 0 OID 0)
-- Dependencies: 204
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 229, true);


--
-- TOC entry 2977 (class 0 OID 0)
-- Dependencies: 196
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.profiles_id_seq', 4, true);


--
-- TOC entry 2978 (class 0 OID 0)
-- Dependencies: 199
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sections_id_seq', 10, true);


--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 315, true);


--
-- TOC entry 2828 (class 2606 OID 204516)
-- Name: products product_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pk PRIMARY KEY (id);


--
-- TOC entry 2810 (class 2606 OID 203343)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 2812 (class 2606 OID 203357)
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 203377)
-- Name: sections uk_3hhqmvx0pt70xjvmjdo5a76go; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT uk_3hhqmvx0pt70xjvmjdo5a76go UNIQUE (alias);


--
-- TOC entry 2816 (class 2606 OID 203964)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 2818 (class 2606 OID 203379)
-- Name: users users_login_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_unique UNIQUE (login);


--
-- TOC entry 2820 (class 2606 OID 203986)
-- Name: users users_nif_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nif_unique UNIQUE (nif);


--
-- TOC entry 2822 (class 2606 OID 203984)
-- Name: users users_phone_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_unique UNIQUE (phone);


--
-- TOC entry 2824 (class 2606 OID 203368)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2826 (class 2606 OID 203373)
-- Name: users_profiles_map users_profiles_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT users_profiles_map_pkey PRIMARY KEY (user_id, profile_id);


--
-- TOC entry 2832 (class 2606 OID 203395)
-- Name: users_profiles_map fkgu8qveimyui706fn78n4xbenf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fkgu8qveimyui706fn78n4xbenf FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2829 (class 2606 OID 203380)
-- Name: profiles_sections_map fkkqferkfgrrnho62b21rya9ej9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fkkqferkfgrrnho62b21rya9ej9 FOREIGN KEY (section_id) REFERENCES public.sections(id);


--
-- TOC entry 2830 (class 2606 OID 203385)
-- Name: profiles_sections_map fknbjkd2pgwcyijblewp1d33rox; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fknbjkd2pgwcyijblewp1d33rox FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 2831 (class 2606 OID 203390)
-- Name: users_profiles_map fksv94wyv9yb3b2hmvr5f48o281; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fksv94wyv9yb3b2hmvr5f48o281 FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 2833 (class 2606 OID 204517)
-- Name: products user_products_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT user_products_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2023-02-02 13:07:06

--
-- PostgreSQL database dump complete
--

