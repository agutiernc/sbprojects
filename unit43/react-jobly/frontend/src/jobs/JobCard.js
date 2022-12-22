import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../users/UserContext'
import { Card, Col } from 'react-bootstrap'

const JobCard = ({ job }) => {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext)
  const [applied, setApplied] = useState()
  const salary = job.salary !== null ? parseInt(job.salary).toLocaleString() : ' N/A';

  // to update applied status
  useEffect(() => {
    setApplied(hasAppliedToJob(job.id))
  }, [job.id, hasAppliedToJob]);

  const handleApply = () => {
    if (hasAppliedToJob(job.id)) return;

    applyToJob(job.id)
    setApplied(true)
  }
  
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className="text-center fw-bold mb-3">{job.title}</Card.Title>
            <p className='lead text-center'>{job.companyName}</p>
            <Card.Text as="div" className='ps-3'>
              <p><span className='fw-bold'>Salary:</span> ${salary}</p>
              <p><span className='fw-bold'>Equity:</span> {job.equity}</p>

              <div className='text-center mt-3'>
                <button
                  type="button"
                  className="btn btn-secondary text-white"
                  onClick={handleApply}
                  disabled={applied}
                >
                  {applied ? 'Applied' : 'Apply'}
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