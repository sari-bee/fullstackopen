interface CourseParts {
  name: string;
  exerciseCount: number
}

interface HeaderProps { courseName: string };
interface ContentProps { courseParts: CourseParts[] };
interface TotalProps { courseParts: CourseParts[] };

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <>
      <p>
      {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
      {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
      {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
    </>
  )
}

const Total = (props: TotalProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName = {courseName}/>
      <Content courseParts = {courseParts}/>
      <Total courseParts = {courseParts}/>
    </div>
  );
};

export default App;