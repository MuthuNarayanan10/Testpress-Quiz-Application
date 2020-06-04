import React from 'react';

import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon
} from 'semantic-ui-react';


export default props => (
  
  <Container textAlign='center'>
    <Segment raised>
      <Item.Group divided>
        <Item>
         
          <Item.Content>
            <Item.Header>
              <h1 > Your Quiz</h1>
            </Item.Header>
            <br />
            <Divider />
            <Item.Meta>
              <Segment size="large">
                Category: <b>Entertainment : Film</b>
              </Segment>
              <Segment size="large">
                No. of Questions: <b>10</b>
              </Segment>
              <Segment size="large">
                Passing Score: <b>50 out of 100</b>
              </Segment>
              <Segment size="large">
                Questions Type: <b>Multiple Choice</b>
              </Segment>
            </Item.Meta>
            <Divider />
            <Item.Extra>
              <Button inverted color="blue" size="medium"  onClick={props.startQuiz}>
                Start Quiz
                <Icon corner="top center"  />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Container>
);
