import { useState, useEffect } from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 첫 번째 인수: 익명 함수, 두 번째 인수: 의존성 배열
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);  // 의존성이 없으면 1번만 실행됨

  const loginHandler = (email, password) => {
    // localStorage에 데이터 저장
    // 1: LogIn 했다는 식별자
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    // AuthContext 자체는 컴포넌트가 되지 않기 때문에 .Provider 속성 사용.
    // AuthContext.Provider는 컴포넌트. 그러므로 JSX코드에서 사용가능.
    // 감싼 자식, 자손 컴포넌트들은 AuthContext에 접근 가능. 
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,  // isLoggedIn이 변경될 때마다 리액트에 의해 업데이트 됨.
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
