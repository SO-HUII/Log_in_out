import React, { useContext } from "react";
import classes from './Navigation.module.css';
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
    // 1. 컴포넌트 함수에서 useContext 호출.
    // 2. 컨텍스트에게 사용하려는 컨텍스트를 가리키는 포인터 전달.
    const ctx = useContext(AuthContext);
    return(
        <nav className={classes.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={props.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;