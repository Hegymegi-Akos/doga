import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../models/Product';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Hiba a termékek betöltése közben.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Termékek</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Ár</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
