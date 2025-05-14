// FRONTEND: src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: '', text: ''});

  useEffect(() => {
    buscaItems();
  }, []);

  const buscaItems = () => {
    axios.get('http://localhost:3001/items').then(res => setItems(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const criarItem = () => {
    if (!form.text) return;
    axios.post('http://localhost:3001/items', { text: form.text }).then(() => {
      buscaItems();
      setForm({ id: '', text: ''});
    });
  };

  const deletarItem = () => {
    if (!form.id) return;
    axios.delete(`http://localhost:3001/items/${form.id}`).then(() => {
      buscaItems();
      setForm({ id: '', text: ''});
    });
  };

  return (
    <div className="container">
      <h1>CRUD Pro Fi Ss Io Na L</h1>

      <div className="form">
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
        <input name="text" placeholder="Texto" value={form.text} onChange={handleChange} />
      </div>

      <div className="buttons">
        <button onClick={criarItem}>Criar</button>
        <button onClick={deletarItem}>Excluir</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            ID {item.id}: {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;