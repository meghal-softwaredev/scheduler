import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// InterviewerListItem Component renders details of particular interviewer
export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return(
    <li className={interviewerListItemClass} selected={props.selected} onClick={ props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     {props.selected && props.name}
    </li>
  );
}