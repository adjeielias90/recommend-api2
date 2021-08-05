import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"
import { useHistory } from 'react-router-dom';

import ClipLoader from "react-spinners/ClipLoader";

import "./SignIn.css"

const base_url = "https://image.tmdb.org/t/p/original/";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { userSignedIn } = bindActionCreators({
        userSignedIn: actionCreators.userSignedIn
    }, dispatch);


    const users = [

        {
            userName: "Elias",
            id: 1
        },
        {
            userName: "Marat",
            id: 2
        }
    ]


    let username = '';
    const _setUserName = ({ value }) => {
        username = value;
    }
    let password = '';
    const _setPassword = ({ value }) => {
        password = value;
    }

    const history = useHistory();
    const submitHandler = e => {

        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            const user = users.filter(user => user.userName == username);
            if (user.length > 0) {
                // setUserPreferences() 
                userSignedIn(user);
                history.push({
                    pathname: "/"
                });
            }
        }, 1000);




    }





    return (


        <div className="margintp" >
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>
                    <h2 className="inactive underlineHover">Sign Up </h2>

                    <div className="fadeIn first">
                    </div>

                    <form onSubmit={submitHandler}>
                        <input onChange={e => _setUserName(e.target)} type="text" id="username" className="fadeIn second" name="username" placeholder="user name" />
                        <input onChange={e => _setPassword(e.target)} type="password" id="password" className="fadeIn third" name="password" placeholder="password" />
                        {isLoading
                            ? <ClipLoader
                                size={80}
                                color={"#123abc"}
                                loading={isLoading}
                            />
                            : <input type="submit" className="fadeIn fourth" value="Log In" />}
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn;