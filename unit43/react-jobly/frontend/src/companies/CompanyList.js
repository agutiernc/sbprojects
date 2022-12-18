import React, { useState, useEffect } from 'react'
import JoblyApi from '../api/api'

import CompanyCard from '../companies/CompanyCard'

const CompanyList = () => {
  const [companies, setCompanies] = useState([])

  // grabs all companies from API - filters by name if included by search
  const companiesList = async (name) => {
    let companies = await JoblyApi.getCompanies(name)

    setCompanies(companies)
  }

  useEffect(() => {
    companiesList()
  }, [])


  // console.log(companies)

  return (
    <div>
      <h1 className='text-center mt-5'>Companies</h1>

      <div className='mt-5'>
        {
          companies.map(c => (
            <CompanyCard key={c.handle} company={c} />
          ))
        }
        </div>
    </div>
  )
}

export default CompanyList;