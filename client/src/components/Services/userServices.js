import axios from "axios";

export  async function Singin(email,password) {
  
  const response =await axios.post("http://localhost:5000/user/signin",{email,password});
  return response
}

export  async function Singup(email,username,password,repassword) {
    const response = await axios.post("http://localhost:5000/user/signup",{email,username,password,repassword});
    return response;
  }

export async function addFavoris(lng,lat,city,country,token)
{
  
    const response=await axios.put("http://localhost:5000/user/addfavoris",{long:lng,lat:lat,city,country},{headers: {
      authorization: token}
    })
    return response;
}
export async function removeFavoris(city,token)
{

  const response=await axios.put("http://localhost:5000/user/rmfavoris",{city},{headers: {
      authorization: token}
    })
    return response;
}