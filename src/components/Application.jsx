import React from "react";
import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.jsx";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

//Application component renders Appointment and DayList component
export default function Application(props) {
  //Extract from useApplicationData hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //Get Interviewers for day and daily appointments
  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //Parse Appointments
  const parsedAppointment = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);
    
  return (
    // render Appointment component
        <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        {/* render DayList Component */}
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        { parsedAppointment }
        {/* Last appointment for the day */}
        { <Appointment key="last" time="5pm" /> }
      </section>
    </main>
  );
}
