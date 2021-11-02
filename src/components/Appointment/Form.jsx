import React, { useState } from "react";
import Button from "../Button.jsx";
import InterviewerList from "../InterviewerList.jsx";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Reset the input fields of the form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    props.onSave(student, interviewer);
  };

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
        <Button onClick={save} confirm>Save</Button>
      </section>
    </section>
  </main>
  );
}