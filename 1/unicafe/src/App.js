import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Stats = ({name, value}) => (
    <>{name} {value}</>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => {setGood(good+1)}} text='good'/>
      <Button handleClick={() => {setNeutral(neutral+1)}} text='neutral'/>
      <Button handleClick={() => {setBad(bad+1)}} text='bad'/>
      <h1>statistics</h1>
      <Stats name='good' value={good}/><br/>
      <Stats name='neutral' value={neutral}/><br/>
      <Stats name='bad' value={bad}/><br/>
      <Stats name='all' value={good+neutral+bad}/><br/>
      <Stats name='average' value={(good-bad)/(good+neutral+bad)}/><br/>
      <Stats name='positive' value={100*(good/(good+neutral+bad))}/> %
    </div>
  )
}

export default App