import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/'

const getCountryByName = async (name) => {
    const response= await axios.get(`${baseUrl}/name/${name}?fullText=true`)
    return response.data
}

const countryService = { getCountryByName }
export default countryService