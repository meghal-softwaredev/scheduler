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

//Appointment component transitions between different states of appointment
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

  //book interview - save student name and interviewer name
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
  
  //delete interview and transition to empty
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
  //if interview is set then mode is show otherwise empty
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* if mode is EMPTY then call Empty component */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* if mode is SHOW then call Show component */}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      )}

      {/* if mode is CREATE then call Form component */}
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}

      {/* if mode is SAVING then call Status component */}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}

      {/* if mode is DELETING then call Status component */}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}

      {/* if mode is CONFIRM then call Confirm component */}
      {mode === CONFIRM && (
        <Confirm
        message="Delete the appointment?"
        onConfirm={deleteInterview}
        onCancel={back}
      />
      )}
      {/* if mode is EDIT then call Form component */}
      {mode === EDIT && (
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}

      {/* if mode is Error_Save then call Empty component */}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment?"
          onClose={back}
        />
      )}

      {/* if mode is ERROR_DELETE then call Error component */}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment?"
          onClose={back}
        />
      )}
    </article>
  );
}