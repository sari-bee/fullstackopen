const Part = ({name, exercises}) => <><p>{name} {exercises}</p></>

const Header = ({header}) => <><h1>{header}</h1></>

const Content = ({content}) => {
  return (
    <>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
}

const Total = ({numbers}) => {
  return (
    <><b>total of {numbers.map(number => number.exercises).reduce((a,b) => a+b)} exercises</b></>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content content={course.parts}/>
      <Total numbers={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App;