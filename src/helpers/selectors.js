// returns an array of appointments for given day
export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.filter(day => day.name === name);
  if (!filteredDay[0]) {
    return [];
  }
  const filteredAppointments = filteredDay[0].appointments.map(id => state.appointments[id]);
  return filteredAppointments;
}
