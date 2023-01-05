import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap'
import JoblyApi from '../api/api'

import JobCard from '../jobs/JobCard'

const CompanyDetails = () => {
  const { handle } = useParams()
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const companyInfo = async () => {
      let company = await JoblyApi.getCompany(handle)
  
      setCompany(company)
    }

    companyInfo()
  }, [handle])

  // replace with loading spinner
  if (!company) return null

  // split companies props in half for 2 columns in row
  const halfArr = Math.floor(company.jobs.length / 2)
  const firstHalfArr = company.jobs.slice(0, halfArr)
  const secondHalfArr = company.jobs.slice(halfArr, company.jobs.length)

  const jobCards1 = firstHalfArr.map(j => <JobCard key={j.id} job={j} />)
  const jobCards2 = secondHalfArr.map(j => <JobCard key={j.id} job={j} />)

  return (
    <div>
      <h1 className='text-center mt-5'>{company.name}</h1>
      <p className='text-center mt-2 lead'>{company.description}</p>

      <div>
      <Row xs={1} md={2} className="g-4 my-3">
        {jobCards1}
        {jobCards2}
      </Row>
      </div>
    </div>
  )
}

export default CompanyDetails;