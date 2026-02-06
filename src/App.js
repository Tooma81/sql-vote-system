import './App.css';
import VoteTable from './tables/VoteTable';
import { useEffect, useState } from 'react';
import { VoteTimer } from './VoteTimer';

function App() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteActive, setVoteActive] = useState(false);


  // Andmete laadimine
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

  // Haaletamine
  const handleVote = async (id, valik) => {
    try {
      await fetch(`http://localhost:5000/api/haaleta/${id}/${valik}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, otsus: valik })
      });
      setVotes(prev => prev.map(v => v.id === id ? { ...v, otsus: valik } : v));      
    } catch (error) {
      console.error("Võrguviga:", error);
    }
  };

  const handleFinshVote = async () => {
    try {
      await fetch(`http://localhost:5000/api/votes/finish`, {
        method: 'PUT',
      });
      setVoteActive(false);
    } catch (error) {
      console.error("Võrguviga:", error);
    }
  }

  const handleRestartVote = async () => {
    try {
      await fetch(`http://localhost:5000/api/votes/reset`, {
        method: 'PUT',
      });
      setVoteActive(false);
      setVotes(prev => prev.map(v => ({ ...v, otsus: 'ootel' })))
    } catch (error) {
      console.error("Võrguviga:", error);
    }
  }

  const handleStartVote = async () => {
    setVoteActive(true);
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);
  
  if (loading) return <h1>Laadin andmeid...</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hääletussüsteem
        </h1>
        <VoteTimer 
          expiryTimestamp={time} 
          onExpire={handleFinshVote} 
          onRestart={handleRestartVote}
          onStart={handleStartVote}
          voteActive={voteActive}
        />
        <VoteTable voteActive={voteActive} data={votes} onVote={handleVote} />
      </header>
    </div>
  );
}

export default App;
