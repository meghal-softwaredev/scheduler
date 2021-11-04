import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);
// Test for Form component
describe("Form", () => {
  
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  // Renders form component and checks for empty input when student name not provided
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  // Renders form component with student name
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // shows error message when student name is blank
  it("validates that the student name is not blank", () => {
    //mocks onSave function
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    //clicks on save button
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });
  
  // save operation can't perform if student name is blank
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    //assert onSave function called once
    expect(onSave).toHaveBeenCalledTimes(1);

    //assert onSave function called with "Lydia Miller-Jones" parameter
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  // mocks onCancel function, after clicking checks whether input field is reset
  it("calls onCancel and resets the input field", () => {
    // mock onCancel function
    const onCancel = jest.fn();

    //render form component
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Cancel button clicked
    fireEvent.click(getByText("Cancel"));

    // reset validation message and input field
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    // onCancel function called once
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});