import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewBoxForm = ({ newBox }) => {
  const initialState = {
    height: '',
    width: '',
    bgColor: ''
  }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    newBox({ ...formData, id: uuidv4() })
    setFormData(initialState)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            id="width"
            type="text"
            name="width"
            placeholder="100"
            value={formData.width}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="height">Height:</label>
          <input
            id="height"
            type="text"
            name="height"
            placeholder="100"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="bgColor">Background Color:</label>
          <input
            id="bgColor"
            type="text"
            name="bgColor"
            placeholder="red"
            value={formData.bgColor}
            onChange={handleChange}
          />
        </div>
        
        <button>create new box</button>
      </form>
    </div>
  )
}


export default NewBoxForm;