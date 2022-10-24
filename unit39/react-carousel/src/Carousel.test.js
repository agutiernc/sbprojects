import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function() {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);

  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Patrick Bateman on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Patrick Bateman on Unsplash")).toBeInTheDocument();
});


it('works when clicking the left arrow', function () {
  const { getByTestId, queryByAltText } = render(<Carousel />)
  const leftArrow = getByTestId('left-arrow')
  const rightArrow = getByTestId('right-arrow')

  fireEvent.click(rightArrow)
  fireEvent.click(leftArrow)

  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument()
  expect(queryByAltText('Photo by Patrick Bateman on Unsplash')).not.toBeInTheDocument()
})


it('hides or shows arrows when cardIdx reaches limit', function () {
  const { getByTestId } = render(<Carousel />)

  const leftArrow = getByTestId('left-arrow')
  const rightArrow = getByTestId('right-arrow')

  // on start, left arrow is hidden only
  expect(leftArrow).toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(getByTestId('right-arrow')) // click right arrow

  // both arrows are visible
  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(getByTestId('right-arrow')) // click right arrow again

  // at end, right arrow is hidden only
  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).toHaveClass('hidden')
})