import CartItem from "./CartItem.jsx";

function Cart({ cart, setCart, onUpdateQuantity, onRemove, total }) {
  if (cart.length === 0) {
    return <div className="cart-empty">Your Cart is Empty</div>;
  }
  const handleCheckout = () => {
    alert(`Checkout! Total: $${total}`);
    setCart([]);
  };
  return (
    <div className="cart">
      <h2>Shopping cart</h2>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
      <div className="cart-total">
        <h3>Total: ${typeof total === "string" ? total : total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={() => handleCheckout()}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
