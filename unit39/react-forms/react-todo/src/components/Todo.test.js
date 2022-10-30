import React from "react";
import { render } from "@testing-library/react";
import Todo from './Todo'

// smoke test
it('renders without crashing', () => {
  render(<Todo />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<Todo />)

  expect(asFragment()).toMatchSnapshot()
})