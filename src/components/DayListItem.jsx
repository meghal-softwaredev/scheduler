import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//DayListItem Component renders details of particular day
export default function DayListItem(props) {
  //set classNames based on spots fully occupied or day selected
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // formatSpots based on spots
  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  }
  //display day name and remaining spots
  return (
    <li className={dayListItemClass} selected={props.selected} onClick={props.onChange} data-testid="day">
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}