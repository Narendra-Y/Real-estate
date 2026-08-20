import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyService = {
  getProperties: async (params = {}) => {
    // Format parameters to match Django API expectation
    const queryParams = {};
    
    if (params.search) queryParams.search = params.search;
    if (params.property_type && params.property_type !== 'all') {
      queryParams.property_type = params.property_type;
    }
    
    // Price range logic
    if (params.priceRange) {
      if (params.priceRange === 'under50') {
        queryParams.max_price = 5000000;
      } else if (params.priceRange === '50to100') {
        queryParams.min_price = 5000000;
        queryParams.max_price = 10000000;
      } else if (params.priceRange === 'above100') {
        queryParams.min_price = 10000000;
      }
    }
    
    if (params.bedrooms && params.bedrooms !== 'all') {
      queryParams.bedrooms = params.bedrooms;
    }
    
    if (params.city && params.city !== 'all') {
      queryParams.city = params.city;
    }
    
    if (params.sort_by) {
      queryParams.sort_by = params.sort_by;
    }
    
    if (params.page) {
      queryParams.page = params.page;
    }

    const response = await api.get('properties/', { params: queryParams });
    return response.data;
  },

  getProperty: async (id) => {
    const response = await api.get(`properties/${id}/`);
    return response.data;
  },

  submitInquiry: async (inquiryData) => {
    const response = await api.post('inquiries/', inquiryData);
    return response.data;
  },

  getCities: async () => {
    const response = await api.get('cities/');
    return response.data;
  },
};

export default api;
