import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import { CartProvider } from './context/CartContext';
import Footer from './component/Footer';
import Categories from './pages/Categories';
import Fragrances from './category/Fragrances';
import Beauty from './category/Beauty';
import Furiture from './category/Furniture';
import Groceries from './category/Groceries';
import { CheckOut } from './pages/CheckOut';

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragrancecollection" element={<Fragrances />} />
          <Route path="/beatycollection" element={<Beauty/>} />
          <Route path="/furniturecollection" element={<Furiture/>} />
          <Route path="/grocerycollection" element={<Groceries/>} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Categories />}></Route>
          <Route path="/checkout" element={<CheckOut />}/>
        </Routes>
        <Footer />
      </HashRouter>
    </CartProvider>
  );
}

export default App;