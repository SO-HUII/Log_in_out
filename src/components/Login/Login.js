import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from './Login.module.css';
import Button from "../UI/Button/Button";

// 컴포넌트 함수 바깥에 생성한 이유
// because 해당 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떠한 데이터도 필요하지 않기 때문.
// 즉, 상호작용 할 필요가 없다는 것.
const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        // USER_INPUT 액션 받을 때마다 value, isValid 모두 업데이트.
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if(action.type === 'INPUT_BLUR') {
        // state.value : 이메일에 입력한 최신 값에 접근하기 위함.
        return { value: state.value, isValid: state.value.includes('@') };
    }
    // 위 조건 제외, 다른 모든 액션에 대해서는 아래 기본 state 반환.
    return { value: '', isValid: false };
};

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, { 
        value: '', 
        isValid: false,
    });
    
    // 1. 모든 로그인 컴포넌트 함수 실행 후 useEffect 재실행
    // 2. setFormIsValid, enteredEmail 혹은 enteredPassword가 마지막 컴포넌트 렌더링 주기에서 변경된 경우에만 실행
    // 3. state 업데이트 함수는 기본적으로 리액트에 의해 절대 변경되지 않도록 보장되기 때문에 setFormIsValid 생략 가능
    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         console.log('checking form validity');
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     }, 500);  // 500밀리초 후에만 해당 작업 수행

    //     return () => {
    //         console.log('clean up');
    //         clearTimeout(identifier);  // 새로운 타이머를 설정하기 전 마지막 타이머 삭제
    //     };
    // }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value, // 페이로드

        });

        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 6
        );    
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        // 추가해야하는 데이터 X -> 페이로드 입력하지 않아도 됨.
        dispatchEmail({ type: 'INPUT_BLUR' })
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, enteredPassword);
    };

    return(
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;