import React, { useState } from 'react';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Axios from 'axios';
import { rooturl } from '../../../../config/config';
import { storedUserInfo } from '../../../../utility';

function MessageWindowSend(props) {
  let messageWindow = Object.assign({},props.messageWindow);
  let [errorMsg,setErrorMsg] = useState(null);
  let handleSubmit = (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    let formData = {
      "windowId": messageWindow._id,
      "creatorId": storedUserInfo().profile._id,
      "message": form.message.value
    }
    Axios.post(`${rooturl}/messages/send_message`, formData).then(resp =>{
      if(resp.status === 200 && resp.data.messages){
        messageWindow.messages = resp.data.messages;
        form.reset();
        props.setMessageWindow(messageWindow);
      }else{
        setErrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>);
      }
    })
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="p-3">
        <Col xs={1}>
        </Col>
        <Col>
          {errorMsg}
          <Form.Control name='message' as='textarea' placeholder='Type a message...'></Form.Control>
        </Col>
        <Col xs={1}>
          <Button variant='primary' type='submit'>Send</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default MessageWindowSend;