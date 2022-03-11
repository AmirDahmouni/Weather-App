import React from "react";
import { Link } from "react-router-dom";
import { useLocation,useHistory } from "react-router-dom";
import "../styles/Header.css";
import GlobalContext from '../../GlobalContext';
import getWeatherAndForecast from "../Services/weatherAndForecast"

export default function NavBar() {

   const location=useLocation()
   const history=useHistory();
   const context = React.useContext(GlobalContext)
   
   const logout=()=>{
    context.setUser(null)
    history.replace("/")

   }

   const selectCity=(target)=>{
     
    context.setLocationInfo({
      city: target.city,
      town: "",
      state: "",
      country: target.country
    });
    
    getWeatherAndForecast({lat:target.lat,lng:target.long})
      .then((res) => {
        context.setWeatherAndForecastInfo(res.data);
      })
      .catch((error) => console.log(error.message))

   }

   switch(location.pathname)
   {
    case "/home":
      return (
       context.user &&
        <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <h4 className="text-white">favoris</h4>
            {
              context.user.favoris.map((item)=><span key={item.id} className="text-muted" onClick={()=>selectCity(item)} 
                 style={{display:"block",fontSize:"23px"}}>{item.city}</span>)
            }
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="button" style={{textAlign:"right"}} onClick={()=>logout()}>Logout</button>
        </nav>
      </div>

      )



     case "/signUp": 
        return ( <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/"><button className="button" style={{textAlign:"right"}}>SignIn</button></Link>
         </nav>
         </div>)


     case "/":
       return (
        
        <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
        <Link to="/signUp"><button className="button" style={{textAlign:"right"}}>SignUp</button></Link>
         </nav>
         </div>
       )

     default:
       return (<div className="pos-f-t">
       <nav className="navbar navbar-dark bg-dark">
       <Link to="/signUp"><button className="button" style={{textAlign:"right"}}>SignUp</button></Link>
        </nav>
        </div>)
     
   }
    
}