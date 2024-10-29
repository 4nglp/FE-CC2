import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const { product } = props;

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price {product.price}$</p>

        <Link to={`/products/${product.id}`} className="btn btn-primary">
          Details
        </Link>
      </div>
    </div>
  );
}
