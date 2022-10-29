import React from "react";
import { render } from "@testing-library/react";
import Box from './Box'

// smoke test
it('renders without crashing', () => {
  render(<Box />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<Box />)

  expect(asFragment()).toMatchSnapshot()
})