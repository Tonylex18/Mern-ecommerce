import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/UserSlice';

function App() {

  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    })

    const userData = await response.json();

    if (userData.success) {
      dispatch(setUserDetails(userData.data))
    }

    console.log("userData: ", userData);

  }

  // user details
  useEffect(() => {
    fetchUserDetails();
  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails // fetch user details
      }}>
        <ToastContainer />
        <Header />
        <div className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </div>
        <Footer />
    </Context.Provider >
    </>
  );
}

export default App;
