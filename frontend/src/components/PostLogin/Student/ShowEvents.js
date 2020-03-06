import React, { useState } from 'react';
import axios from 'axios';
import {storedUserInfo} from '../../../utility';
import {Container,Row,Col,Card} from 'react-bootstrap';
import EventRegister from './EventRegister';

function ShowEvents(props) {
  let [eventResp,setEventResp] = useState({status: 'loading', events: null})
  if(eventResp.status === 'loading' && props.for === 'Student'){
    axios.get(`http://localhost:3001/events/student/${storedUserInfo().profile.id}`).then(resp =>resp.data).then(resp =>{
        if(resp.error){
          return setEventResp({status: 'error',events: null});
        }else{
          console.dir(resp.data);
          setEventResp({status: 'loaded', events: resp.data});
        }
    });
  }else if(eventResp.status === 'loading' && props.for === 'Company'){
    axios.get(`http://localhost:3001/events/company/${storedUserInfo().profile.id}`).then(resp =>resp.data).then(resp =>{
        if(resp.error){
          return setEventResp({status: 'error',events: null});
        }else{
          console.dir(resp.data);
          setEventResp({status: 'loaded', events: resp.data});
        }
    });
  }

  if(eventResp.status === 'loading'){
    return <h3>Loading Events...</h3>
  }
  if(eventResp.status === 'error'){
    return <h3>Something went wrong!</h3>
  }
  let eventsSection = eventResp.events.map(event =>{
    let externalTag = null;
    if(props.for === 'Student'){
      externalTag = <EventRegister eventId={event.id} studentProfileId={storedUserInfo().profile.id} registered={event.registered}/>
    }else{
      externalTag = <Card.Link href={`/company/events/${event.id}/students`}>Registrations</Card.Link>
    }
    return <Row>
      <Col>
        <Card>
          <Card.Title>{event.eventName}</Card.Title>
          <Card.Text>{event.readableTime}</Card.Text>
          <Card.Text><Card.Link href={`/events/show/${event.id}`} >More Info</Card.Link></Card.Text>
          <Card.Text>
            {externalTag}
          </Card.Text>
        </Card>
      </Col>
    </Row>
  });
  return (
    <div>
      <Container>
        {eventsSection}
      </Container>
    </div>
  );
}

export default ShowEvents;