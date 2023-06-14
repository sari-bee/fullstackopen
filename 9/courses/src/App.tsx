interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps { courseName: string }
interface ContentProps { courseParts: CoursePart[] }
interface ContentProp { coursePart: CoursePart }
interface TotalProps { courseParts: CoursePart[] }

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);};

const Part = (props: ContentProp) => {
  switch(props.coursePart.kind) {
    case "basic":
      return (
        <>
          <p><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i></p>
        </>
      )
    case "background":
      return (
        <>
          <p><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i><br/>
          background material: {props.coursePart.backgroundMaterial}</p>
        </>
      )
    case "group":
      return (
        <>
          <p><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          project exercises {props.coursePart.groupProjectCount}</p>
        </>
      )
    case "special":
      return (
        <>
          <p><b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i><br/>
          requirements: {props.coursePart.requirements.map(req => req + " ")}</p>
        </>
      )
    default:
      return assertNever(props.coursePart);
  }
};

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(course => <Part key={course.name} coursePart={course}/>)}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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