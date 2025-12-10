import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductAdd from './pages/ProductAdd';
import Navigation from './components/Navigation';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductAdd />} />
          <Route path="/cart" element={<CartPage />} />
          {/* A részletes nézet útvonalát később adjuk hozzá */}
          {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
