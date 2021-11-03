import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpots(state, appointments) {
    const day = state.days.find(d => d.name === state.day);
    let spots = 0;
  
    for (const appointmentId of day.appointments) {
        if (!appointments[appointmentId].interview) {
          spots++;
      }
    }
    const newDay = {...day, spots};
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);
  
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview: interview})
    .then((res) => {
      const days = updateSpots(state, appointments);
      setState(prev => ({...prev, appointments, days}));
    })
  }
  function cancelInterview(id) {
    const appointments = {
      ...state.appointments, 
      [id]:{...state.appointments[id], interview:null}
    }
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state, appointments);
      setState(prev => ({ ...prev, appointments, days }));
    })
  }
  return { state, setDay, bookInterview, cancelInterview}
}
export default useApplicationData;