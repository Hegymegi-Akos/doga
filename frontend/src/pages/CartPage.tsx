import { useState, useEffect } from 'react';
import axios from 'axios';

// Interface matching the backend's CartItemDto
interface CartItem {
  cartItemId: number;
  customerName: string;
  productName: string;
  price: number;
  quantity: number;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<CartItem[]>('/api/cart');
        setCartItems(response.data);
      } catch (err) {
        setError('Hiba a kosár tartalmának betöltése közben.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Kosár</h2>
      {cartItems.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Termék</th>
                <th>Mennyiség</th>
                <th>Egységár</th>
                <th>Összesen</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cartItemId}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toFixed(2)} Ft</td>
                  <td>{(item.price * item.quantity).toFixed(2)} Ft</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3} className="text-end">Végösszeg:</th>
                <th>{calculateTotal()} Ft</th>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}

export default CartPage;
