import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
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

  // replace with loading spinner
  if (!companies) return null

  // split companies props in half for 2 columns in row
  const halfArr = Math.floor(companies.length / 2)
  const firstHalfArr = companies.slice(0, halfArr)
  const secondHalfArr = companies.slice(halfArr, companies.length)

  // console.log('1st: ', firstHalfArr)
  // console.log('2nd: ', secondHalfArr)

  return (
    <div>
      <h1 className='text-center mt-5'>Companies</h1>

      <div className='mt-5'>
        <Row xs={1} md={2} className="g-4 my-3">
          {
            firstHalfArr.map(c => (
              <CompanyCard key={c.handle} company={c} />
            ))
          }

          {
            secondHalfArr.map(c => (
              <CompanyCard key={c.handle} company={c} />
            ))
          }
        </Row>


        {/* {
         companies.map((c, idx) => (
            <Row key={idx} xs={1} md={2} className="g-4 my-3">
                  <CompanyCard key={c.handle} company={c} />
                  <CompanyCard key={c.handle} company={c} />
            </Row>
          ))
        } */}
        </div>
    </div>
  )
}

export default CompanyList;