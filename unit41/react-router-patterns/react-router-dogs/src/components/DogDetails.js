import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from 'react-bootstrap'

const DogDetails = ({ dogs }) => {
  const { name } = useParams()
  const dog = dogs.filter(d => d.name.toLowerCase() === name)[0]

  return (
    <Container>
      <Card style={{ width: '20rem' }} className='mt-5 mx-auto'>
      <Card.Img variant="top" src={`../${dog.src}.jpg` } />
      <Card.Body className='text-center'>
        <Card.Title>Hello, I'm {dog.name} and I'm {dog.age}</Card.Title>
        <Card.Text as='div'>
          <ul>
            {
              dog.facts.map(f =>
                <li key={f}>{f}</li>  
              )
            }
          </ul>
        </Card.Text>
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
      </Card.Body>
    </Card>
    </Container>
  )
}

export default DogDetails;