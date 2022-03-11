import axios from "axios";

async function getCoordinatesOfAddress(address) {
  const response = await axios.post("http://localhost:5000/coordinations/getcoordsByAdress",{address});
  return response; 
}

export default getCoordinatesOfAddress;