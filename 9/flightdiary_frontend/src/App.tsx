import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    });
  }, [])

  const entryCreator = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post<Entry>('http://localhost:3001/api/diaries', { 
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment
      });
      setEntries(entries.concat(response.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (!(error.response == null)) {
          setErrorMessage(error.response.data);
        }
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p>{errorMessage}</p>
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
