import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

// Test whether Appointment component renders without crashing
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
