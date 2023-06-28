import { useEffect, useState } from 'react';
import axios from 'axios';

interface Entry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string,
}

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    });
  }, [])

  const entryCreator = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios.post<Entry>('http://localhost:3001/api/diaries', { 
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    })
    .then(response => { setEntries(entries.concat(response.data)) });
    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreator}>
        date <input value={newDate} onChange={(event) => setNewDate(event.target.value)}/><br/>
        visibility <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}/><br/>
        weather <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)}/><br/>
        comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/><br/>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map(entry =>
      <p key={entry.id}><b>{entry.date}</b><br/>visibility: {entry.visibility}<br/>weather: {entry.weather}</p>)}
    </div>
  );
}

export default App;
