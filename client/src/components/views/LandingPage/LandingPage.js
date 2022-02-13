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
            LandingPage
            <button onClick={onClickHandler}></button>
        </div>
    );
}

export default LandingPage;
