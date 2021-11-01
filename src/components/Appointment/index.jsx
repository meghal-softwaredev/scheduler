import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Empty from "./Empty.jsx";
import Show from "./Show.jsx";
import Form from "./Form.jsx";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  // const appointmentWithTime = "Appointment at " + props.time;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }
  function deleteInterview(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={deleteInterview}
      />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => transition(EMPTY)}
        onSave={save}
      />)}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
    </article>
  );
}