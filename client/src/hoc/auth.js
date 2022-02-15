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
                    // console.log(response);
                    //로그인하지않은상태
                    if(!response.payload.isAuth) {
                            // alert("로그인 안했어요 : " + response.payload.isAuth)
                        if(option) {
                            // alert("로그인안했어요")
                            navigate("/login");
                        }
                    }else {
                            // alert("else")
                            // console.log(adminRoute + " adminRoute ")
                            // console.log(option + " option ")
                        //로그인한상태
                        if(adminRoute && !response.payload.isAdmin){
                            // alert("로그인했어요");
                            navigate("/")
                        } else {
                            if(option === false){
                                // alert("로그인했어요");
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