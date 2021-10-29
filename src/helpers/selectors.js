// returns an array of appointments for given day
export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.filter(day => day.name === name);
  if (!filteredDay[0]) {
    return [];
  }
  const filteredAppointments = filteredDay[0].appointments.map(id => state.appointments[id]);
  return filteredAppointments;
}

// returns interview (object of student and interviewer) extracting from state
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  }
  return result;
}
