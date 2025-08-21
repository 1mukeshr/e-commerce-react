import React from 'react'
import ProductCard from '../component/ProductCard'

function Product() {
  return (
    <>
      <div className="product-banner">Product</div>
      <div className="feture-section">

        <div className="container">
          <div className="product-itemlist">
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product