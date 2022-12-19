import React, { useState } from 'react'
import { Form, InputGroup, Button} from 'react-bootstrap';

const SearchForm = ({ search }) => {
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    search(filter.trim() || undefined)
    setFilter(filter.trim())
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className='mt-5 col-md-5 mx-auto'>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for company"
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
          />
          <Button type="submit" variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default SearchForm;