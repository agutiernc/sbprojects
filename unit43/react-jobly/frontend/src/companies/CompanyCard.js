import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { NavLink } from "react-router-dom";

const CompanyCard = ({ company }) => {
  
  return (
    <Row xs={1} md={2} className="g-4 mt-2">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center fw-bold">{company.name}</Card.Title>
              <Card.Text as="div">
               {company.description}

               <div className='mt-3'>
                <span className="fw-bold"># of Employees:</span> 
                {company.numEmployees}
               </div>
               <div className='text-center mt-3'>
                <NavLink to={`/companies/${company.handle}`}>
                  <button type="button" className="btn btn-info text-white">
                    Learn More
                  </button>
                </NavLink>
               </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CompanyCard;