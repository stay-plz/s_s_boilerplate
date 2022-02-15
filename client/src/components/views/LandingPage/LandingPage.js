import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
    const navigate = useNavigate();

    const onClickHandler = (event) => {
        axios.post("/api/users/logout")
            .then(response => {
                if(response.data.logoutSuccess) {
                    navigate("/login")
                } else {
                    alert("logout 실패")
                }
            })
    }

    return (
        <div>
            <h2>LandingPage</h2>
            <button onClick={onClickHandler}>Logout</button>
            <a href="/register"><h2>Register</h2></a>
            <a href="/login"><h2>Login</h2></a>
            <a href="/moviemain"><h2>Movie Main</h2></a>
            <a href="/favorite"><h2>Favorite Movie</h2></a>
            <a href="/video/upload"><h2>VideoUpload</h2></a>
        </div>
    );
}

export default LandingPage;
