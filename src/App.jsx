import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import { CartProvider } from './context/CartContext';
import Footer from './component/Footer';
import Categories from './pages/Categories';

function App() {
  return (
    <CartProvider>
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />      
        <Route path="/product" element={<Product />} />
       <Route path="/category" element={<Categories />}></Route>
             
      </Routes>
      <Footer />
    </HashRouter>
    </CartProvider>
  );
}

export default App;