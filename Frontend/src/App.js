import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { Footer } from './Pages/Footer';
import { Header } from './Pages/Header';
import { Products } from './Pages/Products';
import { About } from './Pages/About';
import { Details } from './Pages/Details';
import { Cart } from './Pages/Cart';
import AddProduct from './Pages/AddProduct';
import { Sign } from './Pages/Sign';
import Login from './Pages/Login';
import { Profile } from './Pages/profile';
import { authContext } from './Components/authContext';
import { useContext } from 'react';
import { Users } from './Pages/Users';
import { NotFound } from './Pages/NotFound';

function App() {
  const { Log, isLog, setIsLog, typeUser } = useContext(authContext);
  return (
    <>
      <Header />
      <Routes>
        {isLog && (
          <>
            {typeUser && isLog && (
              <>
                <Route path="/Users" element={<Users />} />
                <Route path="/AddProduct" element={<AddProduct />} />
                <Route path="*" element={<Products />} />
              </>
            )}
            {!typeUser && isLog && (
              <>
                <Route path="/Cart" element={<Cart />} />
                <Route path="/" element={<Home />} />
              </>
            )}
            <Route path="/profile" element={<Profile />} />
            <Route path="/Details/:id" element={<Details />} />
            <Route path="/products" element={<Products />} />
          </>
        )}
        {!isLog && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Sign" element={<Sign />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        <Route path="*" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
