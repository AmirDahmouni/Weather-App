import React from "react";
import { Redirect, Route } from "react-router-dom";
import GlobalContext from '../../GlobalContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
 const context = React.useContext(GlobalContext)
 

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        context.user!=null ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;