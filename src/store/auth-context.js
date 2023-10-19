import React, { useEffect, useState } from "react";

// 컨텍스트 객체 생성
const AuthContext = React.createContext({
    isLoggedIn: false,
    // IDE(Visual Studio Code) 자동 완성을 더 좋게 만들기 위해
    // 기본 컨텍스트 객체에 onLogout 추가
    // 사용하지는 않는 함수이므로 더미 함수로 추가.
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 첫 번째 인수: 익명 함수, 두 번째 인수: 의존성 배열
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if(storedUserLoggedInInformation === '1') {
        setIsLoggedIn(true);
        }
    }, []);  // 의존성이 없으면 1번만 실행됨

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider 
            value={{
                    isLoggedIn: isLoggedIn,
                    onLogout: logoutHandler,
                    onLogin: loginHandler,
                }}
            >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;