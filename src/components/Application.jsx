import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.jsx";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(` /api/appointments/${id}`, {interview: interview})
    .then(() => {
      setState(prev => ({...prev, appointments}));
    })
  }
  function cancelInterview(id) {
    return axios.delete(` /api/appointments/${id}`)
    .then(() => {
      state.appointments[id].interview = null;
    })
  }
  const parsedAppointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    
    return <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      }
    );
  
  const setDay = day => setState({ ...state, day });
 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

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
        { <Appointment key="last" time="5pm" /> }
      </section>
    </main>
  );
}