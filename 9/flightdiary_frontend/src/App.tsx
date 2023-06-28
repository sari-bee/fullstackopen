import { useEffect, useState } from 'react';
import axios from 'axios';

interface Entry {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    });
  })

  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map(entry =>
      <p key={entry.id}><b>{entry.date}</b><br/>visibility: {entry.visibility}<br/>weather: {entry.weather}</p>)}
    </div>
  );
}

export default App;
