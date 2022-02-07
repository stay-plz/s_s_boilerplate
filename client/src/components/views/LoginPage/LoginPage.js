import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_redux/actions/user_action";

function LoginPage(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const body = {
            email,
            password
        };

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate("/");
                } else {
                    alert("ERROR");
                }
            });

    };

    return (
    <div>
        <h2>LoginPage</h2>
        <form onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" value={email} onChange={onEmailHandler} />
            <label>Pssword</label>
            <input type="password" value={password} onChange={onPasswordHandler} />
            <br />
            <button type="submit">Sumbit</button>

        </form>
    </div>
    );
}

export default LoginPage;
