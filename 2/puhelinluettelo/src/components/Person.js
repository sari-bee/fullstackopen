const Person = ({name, number, deleteToggle}) => {
  return (
    <>
    {name} {number} <button onClick={deleteToggle}>Delete</button><br/>
    </>
  )
}

export default Person