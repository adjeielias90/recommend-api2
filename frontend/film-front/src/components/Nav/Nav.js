import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"

import "./Nav.css";
import {
  Link
} from "react-router-dom";
function Nav() {
  const [show, handleShow] = useState(false);
  const {user , selectedMovie } = useSelector((state) => state);
  const first = user[0];
  const dispatch = useDispatch();
    const { userSignedOut } = bindActionCreators({
      userSignedOut: actionCreators.userSignedOut
    }, dispatch);


  const transitionNavBar =() => {
    if(window.scrollY > 100){
      handleShow(true);
    }
    else{
      handleShow(false);
    }
  }
  

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll",transitionNavBar);
    };
  }, []);
 
  return (
    <div id="header" className={`${JSON.stringify(selectedMovie)==JSON.stringify({} )  ? "nav" : ''}`}>
    <div className="logo"><Link to="/"  style={{color:"white"}}>VidServe</Link></div>
    <div className="left-menu">
      <ul className="left-nav-menu">
       
        <li><Link to="/brows"  >Browse</Link></li>
        <li><Link to="/kids" >Kids</Link></li>
        <li><Link to="/dvd" >DVD</Link></li>
      </ul>
    </div>
    <div className="right-menu">
      <ul className="left-nav-menu">
      <li>
      <input type="search" id="gsearch" name="gsearch" placeholder="type to search"/>
      </li>
       {first?.userName
       ? <>
       <li><a href="kids.html">{ first.userName }</a></li><li><i className="far fa-user"></i ><Link to="/movi" onClick={userSignedOut}>Sign Out</Link></li>
       </>
       :<><li><a href="#"></a></li><li className="signIn"><i className="far fa-user "></i><Link to="/login">Sign In</Link></li> </>
       
       }
        

      </ul>
    </div>
  </div>
  );
}

export default Nav;
