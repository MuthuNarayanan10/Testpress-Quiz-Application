import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import logo from '../assets/logo.png';


export default () => (
  <Segment clearing  raised>
    <Header as="h2" floated="left" color="#4AFFDC">
      <img src={logo} alt="Simple Quiz Management System" />
      Simple Quiz Management System
    </Header>
  </Segment>
);
