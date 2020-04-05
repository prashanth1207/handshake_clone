import React, { useState } from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import MessageWindowHistory from './MessageWindowHistory';
import MessageWindowSend from './MessageWindowSend';

function MessageWindowBody(props) {
  let [messageWindow,setMessageWindow] = useState(props.messageWindow);
  return (
  <Tab.Pane eventKey={props.messageWindow._id}>
    <Row><Col><h3 className='text-capitalize'>{messageWindow.responderName}</h3></Col></Row>
    <div className='h-divider'/>
    <Row><Col><MessageWindowHistory messageWindow={messageWindow}/></Col></Row>
    <div className='h-divider'/>
    <Row><Col><MessageWindowSend messageWindow={messageWindow} setMessageWindow={setMessageWindow}/></Col></Row>
  </Tab.Pane>
  );
}

export default MessageWindowBody;