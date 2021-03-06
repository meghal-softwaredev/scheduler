import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

// InterviewerList Component renders list of interviewers
export default function InterviewerList(props) {
  const parsedInterviewer = props.interviewers.map(interviewer => {
    return <InterviewerListItem 
      key={interviewer.id}  
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.value} 
      onChange={event => props.onChange(interviewer.id)}
    />
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewer}</ul>
    </section>
  );
}

//checks whether interviewers props is of array type
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};