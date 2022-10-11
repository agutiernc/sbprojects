const Person = ({ name, age, hobbies }) => {
  const hobbyList = hobbies.map(h => <li>{h}</li>)

  return (
    <div>
      <p>Learn some information about this person</p>
      <p>Name: {name.length > 8 ? name.slice(0, 6) : name}</p>
      <p>Age: {age}</p>
      <p>{age > 18 ? 'Please go vote!' : 'You must be 18'}</p>

      <strong>Hobbies</strong>
      <ul>
        {hobbyList}
      </ul>
    </div>
  )
}