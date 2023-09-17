import React from "react";
import "./App.css";
import deleteIcon from "../src/Imgs/delete.png";
const Paymant = ({
  cart,
  subtotal,
  vat,
  discount,
  onDeleteProduct,
  onQuantityChange,
  items,
  clearData,
  handleProcessSale,
}) => {
  return (
    <div className="paymant">
      <div style={{ height: "70vh", overflowY: "auto" }}>
        <table style={{ width: "97%" }}>
          <tr>
            <th className="width"></th>
            <th className="width">PRODUCTS</th>
            <th className="width">PRICES</th>
            <th className="width">QUANTITY</th>
            <th className="width">TOTAL</th>
          </tr>

          {cart.length === 0 && (
            <tr>
              <th colspan="5" className="noProduct">
                THERE ARE NO PRODUCTS
              </th>
            </tr>
          )}
          {cart.map((item) => (
            <tr key={item.name}>
              <td className="textColor">
                <img
                  src={deleteIcon}
                  onClick={() => onDeleteProduct(item)}
                  alt="deleteIcon"
                />
              </td>
              <td className="textColor">{item.name}</td>
              <td className="textColor"> {item.price}</td>
              <td className="textColor">
                {" "}
                <button
                  onClick={() => onQuantityChange(item, item.quantity - 1)}
                  className="calButton"
                >
                  -
                </button>
                <button className="textButton">{item.quantity}</button>
                <button
                  onClick={() => onQuantityChange(item, item.quantity + 1)}
                  className="calButton"
                >
                  +
                </button>
              </td>
              <td className="textColor">{item.price * item.quantity} INR</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>
          <div className="mainDiv">
            <div className="width4 margin5">Subtotal</div>
            <div className="secondDiv">
              <div className="margin5 dataColor">{subtotal.toFixed(2)} EUR</div>
              <div className="margin5 numColor">{items} items</div>
            </div>
          </div>
          <div className="mainDiv">
            <div className="width4 margin5">VAT text</div>
            <div className="secondDiv">
              <div className="margin5 dataColor">10%</div>
              <div className="margin5 numColor">{vat.toFixed(2)}EUR</div>
            </div>
          </div>

          <div className="mainDiv">
            <div className="width4 margin5">Discount</div>
            <div className="secondDiv">
              <div className="margin5 dataColor">10%</div>
              <div className="margin5 numColor">{discount.toFixed(2)}EUR</div>
            </div>
          </div>
          <div className="mainDiv">
            <div className="width4 margin5">Total</div>
            <div className="margin5 Total">
              {(subtotal + vat - discount).toFixed(2)} EUR
            </div>
            <div></div>
          </div>
        </div>
        <div className="butoonDiv">
          <button onClick={() => clearData()} className="cancleButton">
            CANCLE SALE
          </button>
          <button onClick={() => handleProcessSale()} className="doneButton">
            PROCESS SALE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paymant;
