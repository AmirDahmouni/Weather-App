import axios from "axios";

async function getAddressOfCoordinates(lat, lng) {

  const response = await axios.post("http://localhost:5000/coordinations/getAdressBycoords",{lat,lng});
  return response; 
  
}

export default getAddressOfCoordinates;