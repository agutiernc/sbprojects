import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const DogList = ({ dogs }) => {
  
  return (
    <Container className='mx-auto'>
      <h2 className="my-5 text-center">
        HELLOZ. WE HAVE DOGZ. CLICK ON THEM FOR MORE INFO
      </h2>

      <Row className='justify-content-center ms-5'>
        {
          dogs.map(d => (
            <Col key={d.name} xs="5" className="my-4">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`./${d.src}.jpg` } />
                <Card.Body className='text-center'>
                  <Card.Title>{d.name}</Card.Title>
                  
                  <Link to={d.src}>
                    <Button variant="primary">Look at mee!</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default DogList;