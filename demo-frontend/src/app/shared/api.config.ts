import { environment } from '../../environments/environment';

export const API_CONFIG = {
  authUrl: environment.authBaseUrl,
  login: environment.authBaseUrl + '/oauth/token',
  logout: environment.authBaseUrl + '/logout',
  getAllProfiles: environment.adminBaseUrl + '/getAllProfiles',
  getAllSections: environment.adminBaseUrl + '/getAllSections',

  //Users API
  createUser: environment.usersBaseUrl + '/createUser',
  getUser: environment.usersBaseUrl + '/getUser',
  getUsers: environment.usersBaseUrl + '/getUsers',
  getProducers: environment.usersBaseUrl + '/getProducers',
  deleteUser: environment.usersBaseUrl + '/deleteUser',
  editUser: environment.usersBaseUrl + '/editUser',
  showProducers: environment.usersBaseUrl + '/findProducers',

  //Products API
  createProduct: environment.productsBaseUrl + '/createProduct',
  getProducts: environment.productsBaseUrl + '/getProducts',
  getMyProducts: environment.productsBaseUrl + '/myProducts',
  editProduct: environment.productsBaseUrl + '/editProduct',
  getProduct: environment.productsBaseUrl + '/getProduct',
  deleteProduct: environment.productsBaseUrl + '/deleteProduct',
  findCities: environment.productsBaseUrl + '/findCities',
  findCitiesProducer: environment.productsBaseUrl + '/findCitiesProducer',
  findTypes: environment.productsBaseUrl + '/findTypes',
  findTypesProducer: environment.productsBaseUrl + '/findTypesProducer',
  findCityType: environment.productsBaseUrl + '/findCityType',
  findCityTypeProducer: environment.productsBaseUrl + '/findCityTypeProducer',
  findData: environment.productsBaseUrl + '/getData',
};
