import React from "react";
import { useState } from "react";
import Paymant from "./Paymant";
import ProductList from "./ProductList";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    width: "36%",
  },
};
function App() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let num = 0;
  const onProductClick = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };
  const calculateTotal = (updatedCart) => {
    const calculatedSubtotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalItems = updatedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setItems(totalItems);
    const calculatedVat = calculatedSubtotal * 0.1;

    const calculatedDiscount = calculatedSubtotal * (10 / 100);

    setSubtotal(calculatedSubtotal);
    setVat(calculatedVat);
    setDiscount(calculatedDiscount);
  };

  const onDeleteProduct = (product) => {
    const updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const onQuantityChange = (product, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.name === product.name) {
        item.quantity = newQuantity;
      }

      return item;
    });

    const data = updatedCart.filter((item) => item.quantity > 0);

    setCart(data);
    calculateTotal(updatedCart);
  };
  const clearData = () => {
    setCart([]);
    setSubtotal(0);
    setVat(0);
    setDiscount(0);
    setItems(0);
  };
  const handleProcessSale = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCart([]);
    setSubtotal(0);
    setVat(0);
    setDiscount(0);
    setItems(0);
  };

  return (
    <div className="homepage">
      <Paymant
        cart={cart}
        subtotal={subtotal}
        vat={vat}
        discount={discount}
        onDeleteProduct={onDeleteProduct}
        onQuantityChange={onQuantityChange}
        items={items}
        clearData={clearData}
        handleProcessSale={handleProcessSale}
      />
      <ProductList onProductClick={onProductClick} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Receipt Modal"
        style={customStyles}
      >
        <div className="Receipt">Receipt</div>
        <div style={{ margin: "5px" }}>
          <div className="sale">Sale No.: 00102</div>
          <div> Date</div>
          <table style={{ fontWeight: "500" }}>
            <tr>
              <td style={{ width: "10%" }}>#</td>
              <td style={{ width: "40%" }}>products</td>
              <td style={{ width: "25%" }}>Quantity</td>
              <td style={{ width: "25%" }}>Sub Total</td>
            </tr>
            {cart.map((item) => (
              <tr key={item.name}>
                <td>{num + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </table>
          <div style={{ display: "flex", justifyContent: " space-between" }}>
            <div>Total Items</div>
            <div>{items} Total</div>
            <div>{(subtotal + vat - discount).toFixed(2)} INR</div>
          </div>
          <div className="vta">
            <div>Discount</div>
            <div>10%</div>
          </div>
          <div className="vta">
            <div>VTA</div>
            <div>10%</div>
          </div>

          <button onClick={handleCloseModal} className="closeButton">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
