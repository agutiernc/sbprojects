import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const ColorForm = ({ newColors, colors }) => {
  const [formData, setFormData] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // check if color already exists
    if (colors.includes(formData)) {
      alert('Color already exists!')

      setFormData('')

      return
    }

    newColors(formData)
    setFormData('')
    navigate('/')
  }

  return (
    <div>
      <h3 className="mt-5">
        <Link to='/' className="text-decoration-none">&lt; Back</Link>
      </h3>
   
    <Form className="my-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formData">
        <Form.Label>Color Name:</Form.Label>
        <Form.Control
          type="text"
          className='w-25'
          onChange={handleChange}
          value={formData}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add new Color
      </Button>
    </Form>
    </div>
  )
}

export default ColorForm;