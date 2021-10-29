import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Empty from "./Empty.jsx";
import Show from "./Show.jsx";

export default function Appointment(props) {
  const appointmentWithTime = "Appointment at " + props.time;
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
      {/* {props.time ? appointmentWithTime : "No Appointments"} */}
    </article>
  );
}