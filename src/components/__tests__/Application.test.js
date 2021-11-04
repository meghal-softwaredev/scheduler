import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//Test whether application component renders without crashing
it("renders without crashing", () => {
  render(<Application />);
});
