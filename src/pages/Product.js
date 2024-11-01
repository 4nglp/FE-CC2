import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../api/products";
import { addToCart } from "../store/actions/actions";
import { connect } from "react-redux";

class Product extends React.Component {
  state = {
    loading: true,
    quantity: 0,
    product: {},
  };

  componentDidMount() {
    const id = this.props.id; // Access the id from props

    getById(parseInt(id)).then((product) => {
      this.setState({
        product,
        loading: false,
      });
    });
  }

  handleQuantity = (event) => {
    const value = event.target.value;

    if (value < 0) return;

    this.setState({
      quantity: value,
    });
  };

  addToCart = (product) => {
    this.props.addToCart(product, this.state.quantity);
  };

  render() {
    if (this.state.loading) return "Loading ..";

    const product = this.state.product;
    const quantity = this.state.quantity;

    return (
      <div>
        <div className={"row"}>
          <div className="col-6">
            <img src={product.image} width={"100%"} />
          </div>
          <div className="col-6">
            <h1>{product.name}</h1>

            <p>Price: {product.price}$</p>

            <p>{product.description}</p>

            <input
              type="number"
              value={quantity}
              onChange={this.handleQuantity}
            />

            <br />
            <br />

            <p>Total: {quantity * product.price}</p>

            <button
              className="btn btn-primary"
              onClick={() => this.addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Functional wrapper component to access `useParams`
const ProductWrapper = (props) => {
  const { id } = useParams(); // Retrieve `id` from the URL
  return <Product {...props} id={id} />; // Pass `id` as a prop to `Product`
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productsInfo, quantity) =>
      dispatch(addToCart(productsInfo, quantity)),
  };
};

export default connect(null, mapDispatchToProps)(ProductWrapper);
