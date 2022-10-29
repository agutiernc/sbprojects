import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import BoxList from './BoxList'

const newBox = (boxList, width='100', height='100', bgColor='red') => {
  const widthInput = boxList.getByLabelText('Width:')
  const heightInput = boxList.getByLabelText('Height:')
  const bgColorInput = boxList.getByLabelText('Background Color:')

  fireEvent.change(widthInput, { target: { value: width }})
  fireEvent.change(heightInput, { target: { value: height }})
  fireEvent.change(bgColorInput, { target: { value: bgColor }})

  const button = boxList.getByText('create new box')

  fireEvent.click(button)
}

// smoke test
it('renders without crashing', () => {
  render(<BoxList />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<BoxList />)

  expect(asFragment()).toMatchSnapshot()
})

it('can create a new box', () => {
  const boxList = render(<BoxList />)

  // with no boxes
  expect(boxList.queryByText('Remove Box')).not.toBeInTheDocument();
  
  newBox(boxList)

  const removeBtn = boxList.getByText('Remove Box')

  expect(removeBtn).toBeInTheDocument()
  expect(document.querySelector('#box')).toBeInTheDocument()

  expect(document.querySelector('#box')).toHaveStyle('background-color: red')
  expect(document.querySelector('#box')).toHaveStyle('width: 100px')
  expect(document.querySelector('#box')).toHaveStyle('height: 100px')
})

it('can remove box', () => {
  const boxList = render(<BoxList />)

  newBox(boxList)

  const removeBtn = boxList.getByText('Remove Box')

  fireEvent.click(removeBtn)

  expect(removeBtn).not.toBeInTheDocument()
})