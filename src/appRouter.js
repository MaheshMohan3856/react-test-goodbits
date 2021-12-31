import SignUp from './components/signup/signup';
import Login from './components/login/login';
import Listing from './components/listing/listing';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { Component } from 'react';



const AppRouter = () =>{
    return(
        <Router>
           <Routes>
                <Route path="/login" element={<Login />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<SignUp />} />
                <Route
                    path="/listing"
                    element={
                        <PrivateRoute>
                        <Listing />
                        </PrivateRoute>
                    }
                    />
                {/* <Route exact path="/listing" element={<Listing />} /> */}
           </Routes>
        </Router>
    )
}

function PrivateRoute({ children }) {
    const auth = localStorage.getItem("@authorised");

    return auth ? children : <Navigate to="/login" />;
  }

export default AppRouter