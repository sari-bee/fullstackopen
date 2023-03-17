import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const StatisticLine = ({name, value, unit}) => (
    <><td>{name}</td><td>{value} {unit}</td></>
  )

const Statistics = ({good, neutral, bad}) => {
  if (good+bad+neutral===0) {
    return (
      <>No feedback given</>
    )
  }
  return (
    <table><tbody>
      <tr><StatisticLine name='good' value={good}/></tr>
      <tr><StatisticLine name='neutral' value={neutral}/></tr>
      <tr><StatisticLine name='bad' value={bad}/></tr>
      <tr><StatisticLine name='all' value={good+neutral+bad}/></tr>
      <tr><StatisticLine name='average' value={(good-bad)/(good+neutral+bad)}/></tr>
      <tr><StatisticLine name='positive' value={100*(good/(good+neutral+bad))} unit="%"/></tr>
    </tbody></table>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App