import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistics = ({name, value}) => (
    <>{name} {value}</>
  )

const History = ({good, neutral, bad}) => {
  if (good+bad+neutral==0) {
    return (
      <>No feedback given</>
    )
  }
  return (
    <>
      <Statistics name='good' value={good}/><br/>
      <Statistics name='neutral' value={neutral}/><br/>
      <Statistics name='bad' value={bad}/><br/>
      <Statistics name='all' value={good+neutral+bad}/><br/>
      <Statistics name='average' value={(good-bad)/(good+neutral+bad)}/><br/>
      <Statistics name='positive' value={100*(good/(good+neutral+bad))}/> %
    </>
  )
  }

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
      <History good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App