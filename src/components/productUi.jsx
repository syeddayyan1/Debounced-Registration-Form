
import React from "react";
import "./productUi.css";
import useProducts from "../api/client/getProduct";


const ProductUi = () => {
  const { data, isLoading, isError , error } = useProducts();

  if (isLoading) return <div className="shop-state">Loading products...</div>;

  if (isError) return <div className="shop-state shop-error">{error.message}</div>;

  return (
    <main className="shop-page">
      <header className="shop-header">
        <p className="shop-kicker">THE GOOD FINDS EDIT</p>
        <h1>Our Products</h1>
        <p className="shop-intro">Thoughtful picks for your everyday. Find something you’ll love.</p>
      </header>

      <section className="product-grid" aria-label="Products">
        {data.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="product-price">${Number(product.price).toFixed(2)}</p>
            </div>
            <span className="product-link" aria-hidden="true">VIEW ITEM <span>↗</span></span>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ProductUi;
