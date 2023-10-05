import { Fragment, useState } from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  return (
    <Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </Fragment>
  );
}

export default App;
