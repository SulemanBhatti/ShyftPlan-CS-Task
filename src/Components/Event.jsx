import React from "react";
import { useHistory } from "react-router-dom";

function Event({ event }) {
  const history = useHistory();
  return (
    <tr
      className="list-events"
      key={event?.id}
      onClick={() => history.push(`/events/:${event?.id}`)}
    >
      <td>{event?.position?.name}</td>
      <td>{event?.startsAt}</td>
      <td>{event?.endsAt}</td>
    </tr>
  );
}

export default Event;
