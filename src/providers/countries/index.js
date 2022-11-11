import axios from '../../config/axios';

export const getCountries = async () => {
  try {
    const countries = await axios.get('/AvailableCountries');
    return countries?.data || [];
    
  } catch (error) {
    console.error(error);
  }

  return [];
}

export const getCountryPublicHolidays = async (year, countryCode) => {
  try {
    const holidays = await axios.get(`/PublicHolidays/${year}/${countryCode}`);
    return holidays?.data || [];
    
  } catch (error) {
    console.error(error);
  }

  return [];
}
