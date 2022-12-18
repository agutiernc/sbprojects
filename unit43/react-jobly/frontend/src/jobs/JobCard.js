import React from 'react'
import { Card, Col } from 'react-bootstrap'

const JobCard = ({ job }) => {
  const salary = job.salary !== null ? parseInt(job.salary).toLocaleString() : ' N/A'

  return (
    // <Row xs={1} md={2} className="g-4 my-3">
    //   {Array.from({ length: 4 }).map((_, idx) => (
    //     <Col key={idx}>
    //       <Card>
    //         <Card.Body>
    //           <Card.Title className="text-center fw-bold mb-3">{job.title}</Card.Title>
    //           <Card.Text as="div" className='ps-3'>
    //             <p><span className='fw-bold'>Salary:</span> ${salary}</p>
    //             <p><span className='fw-bold'>Equity:</span> {job.equity}</p>
               
    //             <div className='text-center mt-3'>
    //               <button type="button" className="btn btn-secondary text-white">
    //                 Apply
    //               </button>
    //             </div>
                
    //           </Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>

    <>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className="text-center fw-bold mb-3">{job.title}</Card.Title>
            <Card.Text as="div" className='ps-3'>
              <p><span className='fw-bold'>Salary:</span> ${salary}</p>
              <p><span className='fw-bold'>Equity:</span> {job.equity}</p>

              <div className='text-center mt-3'>
                <button type="button" className="btn btn-secondary text-white">
                  Apply
                </button>
              </div>

            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default JobCard;