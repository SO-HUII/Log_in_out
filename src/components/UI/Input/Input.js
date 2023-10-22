// useImperativeHandle: 컴포넌트나 컴포넌트 내부에서 오는 기능들을
// 명령적으로 사용할 수 있게 해줌.
import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

// Input이 ref프롭을 사용할 수 있게 됨.
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    // 첫 번째 매개변수: 
    // 두 번째 매개변수: (객체를 반환해야하는)함수. 해당 객체는 외부에서 사용할 수 있는 모든 데이터 포함.
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    });

    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
            ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;