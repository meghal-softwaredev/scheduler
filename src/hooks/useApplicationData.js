import { useState, useEffect } from 'react';
import axios from 'axios';

//Extracted logic other than visual from Application to useApplicationData() hook
function useApplicationData() {
  //state of application
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Fetch data from Api related to days, appointments and interviewers and setState in initial render
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

  //updateSpots based on booked/cancel interview
  function updateSpots(appointments) {
    //get day matching with state day
    const day = state.days.find(d => d.name === state.day);
    let spots = 0;
  
    for (const appointmentId of day.appointments) {
        if (!appointments[appointmentId].interview) {
          spots++;
      }
    }
    //update day with updated spots 
    const newDay = {...day, spots};
    //update days
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);
  
    return newDays;
  }
  //if interview is booked - update interview 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //api call to update appointment for particular id for booked interview
    return axios.put(`/api/appointments/${id}`, {interview: interview})
    .then((res) => {
      const days = updateSpots(appointments);
      setState(prev => ({...prev, appointments, days}));
    })
  }
  //if interview is cancelled - update interview to null
  function cancelInterview(id) {
    const appointments = {
      ...state.appointments, 
      [id]:{...state.appointments[id], interview:null}
    }
    //api call to delete appointment for particular id
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(appointments);
      setState(prev => ({ ...prev, appointments, days }));
    })
  }
  return { state, setDay, bookInterview, cancelInterview}
}
export default useApplicationData;