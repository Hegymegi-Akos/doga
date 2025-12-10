import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductAdd() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !price) {
        setError('A név és az ár megadása kötelező.');
        return;
    }

    try {
      await axios.post('/api/products', {
        name,
        price: parseFloat(price),
      });
      navigate('/');
    } catch (err) {
      setError('Hiba történt a termék hozzáadása közben.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Új termék hozzáadása</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Név</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Ár</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Mentés</button>
      </form>
    </div>
  );
}

export default ProductAdd;
