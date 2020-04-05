import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Card, Col, Row, Button, Nav, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { storedUserInfo } from '../../../../utility';
import { rooturl } from '../../../../config/config';
import MessageWindowLink from './MessageWindowLink';
import MessageWindowBody from './MessageWindowBody';

function ShowMessages(props) {
  let [messageWindowResp,setMessageWindowResp] = useState({status: 'loading',messageWindows: []});
  let userType = storedUserInfo().type.toString();
  let profile = storedUserInfo().profile;
  if(messageWindowResp.status === 'loading'){
    Axios.get(`${rooturl}/messages/${userType}/${profile._id}`).then(resp =>{
      if(resp.status === 200 && resp.data.profile){
        setMessageWindowResp({status: 'loaded', messageWindows: resp.data.profile.messageWindows})
      }else{
        setMessageWindowResp({status: 'error',messageWindows: []});
      }
    });
  }
  let messageWindowsTag = [];
  let messagesTag = [];
  if(messageWindowResp.status === 'loading'){
    messageWindowsTag = "Loading..."
  }else{
    messageWindowResp.messageWindows.forEach(messageWindow => {
      messageWindow.responderName = messageWindow.respondentType === 'CompanyProfile' ? messageWindow.respondent.name : `${messageWindow.respondent.firstName} ${messageWindow.respondent.lastName}`;
      messageWindow.myName = storedUserInfo().profile.name || `${storedUserInfo().profile.firstName} ${storedUserInfo().profile.lastName}`
      messageWindow.responderImagePath = `${rooturl}/images/profile_pics/${messageWindow.respondent.user}.png`;
      messageWindow.myImagePath = `${rooturl}/images/profile_pics/${storedUserInfo().id}.png`;
      messageWindowsTag.push(<MessageWindowLink messageWindow={messageWindow}/>);
      messagesTag.push(<MessageWindowBody messageWindow={messageWindow}/>);
    });
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="default">
            <Col xs='3' className='v-divider'>
              <Row>
                <Col><h3>Messages</h3></Col>
              </Row>
              <div className='h-divider'/>
              <Row>
                <Nav className="flex-column">
                  {messageWindowsTag}
                </Nav>
              </Row>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey='default'>
                  <div className='text-center'>No conversation selected</div>
                </Tab.Pane>
                {messagesTag}
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ShowMessages;