import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../_redux/actions/user_action";

export const auth = (SpecificComponent, option, adminRoute = null) => {
    /**
     * option
     *  null -> 아무나출입
     *  true -> 로그인한사람만출입
     *  false _> 로그인한유저 출입불가
     */
    const AuthenticationCheck = (props) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(authUser())
                .then(response => {
                    if(!response.payload.isAuth) {
                        if(option) {
                            navigate("/login");
                        }
                    }else {
                        if(adminRoute && !response.payload.isAdmin){
                            navigate("/")
                        } else {
                            if(option === false){
                                navigate("/");
                            }
                        }
                    }
                });
        }, []);
        return (<SpecificComponent />);
    }

    return AuthenticationCheck;
};

export default auth;