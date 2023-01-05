import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import JoblyApi from '../api/api'

import JobCard from '../jobs/JobCard'
import SearchForm from '../common/SearchForm'

const JobList = () => {
  const [jobs, setJobs] = useState([])

  // grabs all jobs from API - filters by name if searched
  const allJobs = async (name) => {
    let jobs = await JoblyApi.getJobs(name)

    setJobs(jobs)
  }

  useEffect(() => {
    allJobs()
  }, [])

  // replace with loading spinner
  if (!jobs) return null

  // split companies props in half for 2 columns in row
  const halfArr = Math.floor(jobs.length / 2)
  const firstHalfArr = jobs.slice(0, halfArr)
  const secondHalfArr = jobs.slice(halfArr, jobs.length)

  return (
    <div>
      <h1 className='text-center mt-5'>Jobs</h1>

      <SearchForm search={allJobs} type="job" />

      <div className='mt-5'>
        <Row xs={1} md={2} className="g-4 my-3">
          {
            firstHalfArr.map(j => (
              <JobCard key={j.id} job={j} />
            ))
          }

          {
            secondHalfArr.map(j => (
              <JobCard key={j.id} job={j} />
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default JobList;