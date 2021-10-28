export function getAppointmentsForDay(state, name) {
  let result = [];
  const filteredDayAppointmentArr = state.days.filter(day => day.name === name);

  if (!filteredDayAppointmentArr[0]) {
    return result;
  }
  
  for (const appointment of filteredDayAppointmentArr[0].appointments) {
    result.push(state.appointments[appointment]);
  }

  return result;
}
