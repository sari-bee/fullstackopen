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
    setNewComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p>{errorMessage}</p>
      <form onSubmit={entryCreator}>
        date <input value={newDate} type="date" onChange={(event) => setNewDate(event.target.value)}/><br/>
        visibility
        <input type="radio" id="great" value="great" name="visibility" onChange={() => setNewVisibility("great")}/>great
        <input type="radio" id="good" value="good" name="visibility" onChange={() => setNewVisibility("good")}/>good
        <input type="radio" id="ok" value="ok" name="visibility" onChange={() => setNewVisibility("ok")}/>ok
        <input type="radio" id="poor" value="poor" name="visibility" onChange={() => setNewVisibility("poor")}/>poor
        <br/>
        weather
        <input type="radio" id="sunny" value="sunny" name="weather" onChange={() => setNewWeather("sunny")}/>sunny
        <input type="radio" id="rainy" value="rainy" name="weather" onChange={() => setNewWeather("rainy")}/>rainy
        <input type="radio" id="cloudy" value="cloudy" name="weather" onChange={() => setNewWeather("cloudy")}/>cloudy
        <input type="radio" id="stormy" value="stormy" name="weather" onChange={() => setNewWeather("stormy")}/>stormy
        <input type="radio" id="windy" value="windy" name="weather" onChange={() => setNewWeather("windy")}/>windy
        <br/>
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
