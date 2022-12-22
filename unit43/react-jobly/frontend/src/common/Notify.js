import React from 'react';
import { Alert } from 'react-bootstrap'

const Notify = ({ message }) => {
  if (message.type === 'success') {
    return (
      <div>
        <Alert variant={'primary'}>
          {message.msg}
        </Alert>
      </div>
    );
  } else if (message.type === 'error') {
   return (
      <div>
        <Alert variant={'danger'}>
          {message.msg}
        </Alert>
      </div>
    );
  } else {
    return;
  }
}

export default Notify;