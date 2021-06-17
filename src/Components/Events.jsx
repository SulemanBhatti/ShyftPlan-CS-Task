import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import '../Styles/Events.css';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 50px;
  float: right;
`;

function Events() {
  const [events, setEvents] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [offSet, setOffSet] = useState(0);
  const [startTimeBool, setStartTimeBool] = useState(true);
  const [timefilter, setTimeFilter] = useState('');
  const [endTimeBool, setEndTimeBool] = useState(false);
  const [endData, setEndData] = useState(false);
  const [loader, setLoader] = useState(true);
  const PAGE_LIMIT = 10;
  const history = useHistory();
  const queryParams = startTimeBool&&timefilter ? `startsAt=${timefilter}` : endTimeBool&&timefilter ? `endsAt=${timefilter}` : `offset=${offSet}`;
  
  useEffect(()=>{
    axios.get(`https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events?${queryParams}`,{params:{
      login: "frontend@shyftplan.com",
      password: "api_test_auth_token"
    },
      headers: {
        'Authorization': 'Basic ZnJvbnRlbmRAc2h5ZnRwbGFuLmNvbTphcGlfdGVzdF9hdXRoX3Rva2Vu'
    }})
    .then((response)=>{
        setLoader(false);
        setOffSet(offSet+10);
        setEvents(response?.data?.items.slice(0, PAGE_LIMIT));
        response?.data?.items.length <=0 ? setEndData(true) : setEndData(false);
    })
    .catch(err=>{setLoader(false); setEndData(true); console.log('Error getting events', err)});
  },[loadData, timefilter]);

  const handleLoadData = () =>{
    if(endData){
      setOffSet(0);
      setTimeFilter('');
    }
    setLoadData(!loadData);
  }

  const handleRadioFilter = (e) =>{
    if(e.target.id === "startsAt"){
      setStartTimeBool(true);
      setEndTimeBool(false);
    }else if(e.target.id==="endsAt"){
      setEndTimeBool(true); 
      setStartTimeBool(false);
    }
  }

  return (
    <React.Fragment>
      <div className="events">
        <form className="form-width" onChange={handleRadioFilter}>
          <input type="radio" id="startsAt" name="time" checked={startTimeBool} />
          <label for="startsAt">Events that start after selected date</label><br/>
          <input type="radio" id="endsAt" name="time" checked={endTimeBool}/>
          <label for="endsAt">Events that start before selected date</label>
        </form>
        <Datetime onChange={(e)=>setTimeFilter(e._d.toISOString(e))} inputProps={{className:'datetime', placeholder:"Click to Select Time/Date"}}/>
      <table>
        <tr>
          <th>Position Name</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
        {endData 
          ? <p>No more data to show/No events available</p> 
          : loader ? <BarLoader color={'purple'} loading={loader} css={override} height={10} width={300} /> 
          : events?.map((i,key)=><tr className='list-events' key={key} onClick={()=>history.push(`/events/:${i?.id}`)}>
                <td>{i?.position?.name}</td>
                <td>{i?.startsAt}</td>
                <td>{i?.endsAt}</td>
        </tr>)}
      </table>
    </div>
    <div className="div-flex">
      <button className="button button1" onClick={handleLoadData}>{endData? "Reset" : "Load More"}</button>
    </div>
    </React.Fragment>
  );
}

export default Events;