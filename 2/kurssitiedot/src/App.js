const Part = ({name, exercises}) => <><p>{name} {exercises}</p></>

const Header = ({header}) => <><h2>{header}</h2></>

const Content = ({content}) => <>{content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>)}</>

const Total = ({numbers}) => 
  <><b>total of {numbers.map(number => number.exercises).reduce((a,b) => a+b)} exercises</b></>

const Course = ({ name, parts }) =>
      <><Header header={name}/>
      <Content content={parts}/>
      <Total numbers={parts}/></>

const Courses = ({ courses }) => <div>{courses.map(course =>
          <Course key={course.id} name={course.name} parts={course.parts}/>)}</div>

const App = () => {
  const courses = [
    {
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middleware",
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>
    </div>
  )
}

export default App;