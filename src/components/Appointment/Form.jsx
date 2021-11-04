import React, { useState } from "react";
import Button from "../Button.jsx";
import InterviewerList from "../InterviewerList.jsx";

// Form component which takes student name and interviewer name as input and has two buttons Cancel and Save
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset the input fields of the form
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  // cancel will reset input field and calls props.onCancel()
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // validates student name if blank shows error message
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={event => setStudent(event.target.value)}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={validate} confirm>Save</Button>
      </section>
    </section>
  </main>
  );
}