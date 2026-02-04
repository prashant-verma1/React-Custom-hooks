import "./App.css";
import { useCart } from "./hooks/useCart.js";
import { data } from "./data/data.js";
import ProductCard from "./components/ProductCart.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  const { cart, removecart, addToCart, updateQuantity, total } = useCart();
  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping Cart</h1>
        </header>
        <main>
          <section className="products">
            {data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </section>
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removecart}
            total={total}
          />
        </main>
      </div>
    </>
  );
}

export default App;
