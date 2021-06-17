import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import CustomImgDropdown from "../Utils/CustomImgDropdown";
import '../Styles/Events.css';
import { css } from "@emotion/react";
import { useParams, useHistory } from "react-router-dom";

const override = css`
  display: block;
  margin: 50px;
  float: right;
`;

function EventDetails() {
  const [eventDetails, setEventDetails] = useState([]);
  const [endData, setEndData] = useState(false);
  const [loader, setLoader] = useState(true);
  let { id } = useParams();
  const history = useHistory();

  useEffect(()=>{
    axios.get(`https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events/${id.substring(1)}`,{params:{
      login: "frontend@shyftplan.com",
      password: "api_test_auth_token"
    },
      headers: {
        'Authorization': 'Basic ZnJvbnRlbmRAc2h5ZnRwbGFuLmNvbTphcGlfdGVzdF9hdXRoX3Rva2Vu'
    }})
    .then((response)=>{
        setLoader(false);
        setEventDetails(response?.data);
        if(!response?.data) setEndData(true);
    })
    .catch(err=>{setLoader(false); console.log('Catch error', err)});
  },[]);

  return (
    <React.Fragment>
    <div className="events">
      <table>
        <tr>
          <th>Position Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Employees </th>
        </tr>
        {endData 
          ? <p>Event does not exist</p> 
          : loader ? <BarLoader color={'purple'} loading={loader} css={override} height={10} width={300} /> 
          : eventDetails?.employees && <tr className='list-events' >
                <td>{eventDetails?.position?.name}</td>
                <td>{eventDetails?.startsAt}</td>
                <td>{eventDetails?.endsAt}</td>
                <td><CustomImgDropdown options={eventDetails?.employees}/></td>
            </tr>}
      </table>
    </div>
    <div className="div-flex">
      <button className="button button1" onClick={()=>history.push(`/events`)}>Back</button>
    </div>
    </React.Fragment>
  );
}

export default EventDetails;