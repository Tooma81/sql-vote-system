import './App.css';
import VoteTable from './tables/VoteTable';
import { useEffect, useState } from 'react';

function App() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from our Node.js API
    fetch('http://localhost:5000/api/votes')
      .then(res => res.json())
      .then(data => {
        setVotes(data);
        setLoading(false);
      })
      .catch(err => console.error("Viga andmete laadimisel:", err));
  }, []);

  console.log(votes)
  
  if (loading) return <h1>Laadin andmeid...</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hääletussüsteem
        </h1>
        <VoteTable data={votes} />
      </header>
    </div>
  );
}

export default App;
