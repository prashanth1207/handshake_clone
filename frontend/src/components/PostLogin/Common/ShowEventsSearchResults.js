import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card
} from 'react-bootstrap';
import EventRegister from '../Student/Events/EventRegister';
import { storedUserInfo } from '../../../utility';
import { searchEvents } from './../../../redux/event/eventActions'
import MyPagination from './MyPagination';


function ShowEventsSearchResults(props) {
  let perPage = 10;
  if (props.eventResp.status === 'loading') {
    return <h3>Loading Events...</h3>;
  }
  if (props.eventResp.status === 'error') {
    return <h3>Something went wrong!</h3>;
  }
  const handlePrevPage = (e) => {
    if(props.eventResp.data.currentPage === 1){
      return true;
    }
    props.searchEvents(props.eventResp.data.userType,{
      ...props.eventResp.queryParams,
      page: props.eventResp.data.currentPage - 1, 
      perPage: perPage
    });
  };
  const handleNextPage = (e) => {
    if(props.eventResp.data.currentPage === props.eventResp.data.totalPages){
      return true;
    }
    props.searchEvents(props.eventResp.data.userType,{
      ...props.eventResp.queryParams,
      page: props.eventResp.data.currentPage + 1, 
      perPage: perPage
    });
  };

  const eventsSection = props.eventResp.data.events.map((event) => {
    let externalTag = null;
    if (props.for === 'Student') {
      externalTag = <EventRegister event={event} studentProfileId={storedUserInfo().profile._id} studentMajor={props.eventResp.major} />;
    } else {
      externalTag = <Card.Link href={`/company/events/${event._id}/students`}>Registrations</Card.Link>;
    }
    return (
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Text>{event.readableTime}</Card.Text>
              <Card.Text><Card.Link href={`/events/show/${event._id}`}>More Info</Card.Link></Card.Text>
              <Card.Text>
                {externalTag}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });
  return (
    <div>
      {eventsSection}
      <MyPagination handlePrevPage={handlePrevPage} currentPage={props.eventResp.data.currentPage} totalPages={props.eventResp.data.totalPages} handleNextPage={handleNextPage}/>
    </div>
  );
}

const mapStateToProp = (state) => ({
  eventResp: state.event.eventSearchDetails
})

export default connect(mapStateToProp,{searchEvents})(ShowEventsSearchResults);