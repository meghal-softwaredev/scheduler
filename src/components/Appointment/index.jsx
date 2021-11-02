import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Empty from "./Empty.jsx";
import Show from "./Show.jsx";
import Form from "./Form.jsx";
import Error from "./Error";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer : interviewer || props.interviewers[0].id
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
  }
  
  function deleteInterview(id) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR_DELETE, true);
    })
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      )}
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
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
      {mode === CONFIRM && (
        <Confirm
        message="Delete the appointment?"
        onConfirm={deleteInterview}
        onCancel={back}
      />
      )}
      {mode === EDIT && (
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment?"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment?"
          onClose={back}
        />
      )}
    </article>
  );
}