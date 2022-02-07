import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_redux/actions/user_action";

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            return alert("비밀번호확인이 다릅니다.");
        }

        let body = {
            email,
            name,
            password,
            confirmPassword
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.registerSuccess) {
                    navigate("/");
                } else {
                    alert("회원가입 오류");
                }
            });
    } 

    return (
        <div>
            <h2>Register Page</h2>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />
                <label>ConfirmPasswod</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
