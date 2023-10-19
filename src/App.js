import React, { Fragment, useContext } from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);
  
  return (
    // AuthContext 자체는 컴포넌트가 되지 않기 때문에 .Provider 속성 사용.
    // AuthContext.Provider는 컴포넌트. 그러므로 JSX코드에서 사용가능.
    // 감싼 자식, 자손 컴포넌트들은 AuthContext에 접근 가능. 
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn: isLoggedIn,  // isLoggedIn이 변경될 때마다 리액트에 의해 업데이트 됨.
    //     onLogout: logoutHandler
    //   }}
    // >
    <Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </Fragment>
      
    // </AuthContext.Provider>
  );
}

export default App;
