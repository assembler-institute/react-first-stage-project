import React, { useContext } from "react";

import "./ShoppingCartItem.scss";

import Button from "../Button";
import { useProducts } from "../Context/reducer";

function buildSelectOptions(unitsInStock) {
  return Array.from({ length: unitsInStock }, (_value, index) => {
    const currentIndex = index + 1;
    return (
      <option key={currentIndex} value={currentIndex}>
        {currentIndex}
      </option>
    );
  });
}

function ShoppingCartItem({ id, img, title, price, quantity, unitsInStock }) {
  const { remove, change } = useProducts();
  function onHandleChange(event) {
    change(event, id);
  }
  function onHandleRemove() {
    remove(id);
  }

  return (
    <div className="col">
      <div className="row flex-column">
        <div className="col">
          <div className="row">
            <div className="col-12 col-xl-4 mb-3 mb-xl-0">
              <img className="ShoppingCartItem__img" src={img} alt="" />
            </div>
            <div className="col-12 col-xl-8">
              <div className="row flex-column">
                <div className="col">
                  <h4 className="h5">
                    <strong>{title}</strong>
                  </h4>
                </div>
                <div className="col">
                  <p>
                    <strong>{price}€</strong>
                  </p>
                </div>
                <div className="col mt-auto">
                  {unitsInStock ? (
                    <div className="row">
                      <div className="col col-6 col-lg-4">
                        <select
                          className="custom-select"
                          onChange={onHandleChange}
                          onBlur={onHandleChange}
                          value={quantity}
                        >
                          {buildSelectOptions(unitsInStock)}
                        </select>
                      </div>
                      <div className="col col-6 col-lg-8">
                        <Button onClick={onHandleRemove}>Remove</Button>
                      </div>
                    </div>
                  ):`Quantity: ${quantity}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItem;