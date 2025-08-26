import React from 'react'

import ProductCard from '../component/ProductCard';
import bannerImg from "../assets/images/banner.jpg";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div className="bannersection">
        <img src={bannerImg} alt="Banner" />
        <div className="container">
          <div className="left">
            <h1>Expereence the Best <br />Beuty Services</h1>

            <button>Shop Now  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></button>
          </div>
          <div className="right">

          </div>
        </div>
      </div>
      <div className="offer-section">
        <div className="container">
          <div className="offer-card-flex">
            <div className="offer-card" style={{ background: "#FEEFEA " }}>
              <h2>Everyday Fresh &
                Clean with Our
                Products </h2>

              <button> Shop Now  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></button>
            </div>
            <div className="offer-card" style={{ background: "#ECFFEC " }}>
              <h2>Everyday Fresh &
                Clean with Our
                Products </h2>

              <button>Shop Now  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></button>
            </div>
            <div className="offer-card" style={{ background: "#FFFCEB  " }}>
              <h2>Everyday Fresh &
                Clean with Our
                Products </h2>

              <button> Shop Now <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></button>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="container">
          <div className="category-box groceries">
            <Link to="/grocerycollection">
            <div className="category-text">Groceries</div>
            </Link>
        </div>
        <div className="category-box beauty">
          <Link to="/beatycollection">
            <div className="category-text">Beauty</div>
            </Link>
        </div>
        <div className="category-box fragrances">
           <Link to="/fragrancecollection" >
            <div className="category-text">Fragrances</div>
           </Link>
        </div>
        <div className="category-box furniture">
          <Link to="/furniturecollection">
            <div className="category-text">Furniture</div>
            </Link>
        </div>
        </div>
      </div>
      <div className="feture-section">

        <div className="container">
          <div className="product-itemlist">
            <ProductCard />
          </div>
        </div>

      </div>

    </main>
  )
}

export default Home

