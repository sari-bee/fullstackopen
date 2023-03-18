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

export default Course