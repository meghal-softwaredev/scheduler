import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Empty from "./Empty.jsx";
import Show from "./Show.jsx";
import Form from "./Form.jsx";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  // const appointmentWithTime = "Appointment at " + props.time;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
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
      />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => transition(EMPTY)}
        // onSave={() => transition(SHOW)}
      />)}
    </article>
  );
}