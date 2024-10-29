import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CartIcon.css";

function CartIcon({ totalQuantity }) {
  return (
    <div id="cart-icon">
      <Link to="/cart">
        <i class="fa-solid fa-cart-shopping" style={{ color: "black" }}></i>
        <span
          className="badge badge-danger"
          style={{ color: "white", backgroundColor: "red" }}
        >
          {totalQuantity}
        </span>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    totalQuantity: state.cart.reduce((total, item) => total + item.quantity, 0),
  };
};

export default connect(mapStateToProps)(CartIcon);
