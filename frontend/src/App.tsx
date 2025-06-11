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
      <h1 className='containerTitle'>CRUD</h1>

      <div className="form">
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
        <input name="text" placeholder="Texto" value={form.text} onChange={handleChange} />
      </div>

      <div className="buttons">
        <button id="addButton" onClick={criarItem}>Criar</button>
        <button id="excluirButton" onClick={deletarItem}>Excluir</button>
      </div>

      <ul className='listContainer'>
        {items.map((item) => (
          <li key={item.id}>
            <span className='idList'>ID {item.id}</span>: {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;