import React, { Component } from 'react';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu
} from 'semantic-ui-react';
import Loader from './Loader.jsx';
import Result from './Result.jsx';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizData: props.quizData,
      isLoading: true,
      questionIndex: 0,
      correctAnswers: 0,
      userSlectedAns: null,
      quizIsCompleted: false
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.retakeQuiz = this.retakeQuiz.bind(this);
    this.startNewQuiz = this.startNewQuiz.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ userSlectedAns: name });
  }

  componentDidMount() {
    const { quizData, questionIndex } = this.state;
    const outPut = this.getRandomNumber();
    const options = [...quizData[questionIndex].incorrect_answers];
    options.splice(outPut, 0, quizData[questionIndex].correct_answer);

    setTimeout(() => {
      this.setState({ isLoading: false, options, outPut });
    }, 2000);
  }

  getRandomNumber() {
    const min = Math.ceil(0);
    const max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleNext() {
    const {
      userSlectedAns,
      quizData,
      questionIndex,
      correctAnswers
    } = this.state;

    let point = 0;
    if (userSlectedAns === quizData[questionIndex].correct_answer) {
      point = 1;
    }

    if (questionIndex === 9) {
      this.setState({
        correctAnswers: correctAnswers + point,
        userSlectedAns: null,
        isLoading: true,
        quizIsCompleted: true,
        questionIndex: 0,
        options: null
      });
      return false;
    }

    const outPut = this.getRandomNumber();

    const options = [...quizData[questionIndex + 1].incorrect_answers];
    options.splice(outPut, 0, quizData[questionIndex + 1].correct_answer);
    this.setState({
      correctAnswers: correctAnswers + point,
      questionIndex: questionIndex + 1,
      userSlectedAns: null,
      options,
      outPut
    });
  }

  renderResult() {
    const { correctAnswers } = this.state;
    const { backToHome } = this.props;
    const resultRef = (
      <Result
        correctAnswers={correctAnswers}
        retakeQuiz={this.retakeQuiz}
        backToHome={backToHome}
      />
    );
    setTimeout(() => {
      this.setState({ resultRef });
    }, 3000);
  }

  retakeQuiz() {
    // console.log('Retake quiz func');
    const { quizData, questionIndex } = this.state;
    const outPut = this.getRandomNumber();
    const options = [...quizData[questionIndex].incorrect_answers];
    options.splice(outPut, 0, quizData[questionIndex].correct_answer);

    this.setState({
      correctAnswers: 0,
      quizIsCompleted: false,
      startNewQuiz: true,
      options,
      outPut
    });
  }

  startNewQuiz() {
    setTimeout(() => {
      this.setState({ isLoading: false, startNewQuiz: false, resultRef: null });
    }, 3000);
  }

  render() {
    const {
      quizData,
      questionIndex,
      options,
      outPut,
      userSlectedAns,
      isLoading,
      correctAnswers,
      quizIsCompleted,
      resultRef,
      startNewQuiz
    } = this.state;

    // console.log(userSlectedAns);
    // console.log(questionIndex, outPut);
    // console.log('Score ==>', correctAnswers);

    if (quizIsCompleted && !resultRef) {
      this.renderResult();
      // console.log('Routing to result');
    }

    if (startNewQuiz) {
      this.startNewQuiz();
    }

    return (
      <div>
        {!quizIsCompleted && isLoading && <Loader />}
        {!isLoading && (
          <Container>
            <Segment Piled>
              <Item.Group divided>
                <Item>
                  <Item.Content>
                    <Item.Header>
                      <h3>Question No.{questionIndex + 1} of 10</h3>
                    </Item.Header>
                    <br />
                    <br />
                    <br />
                    <Item.Meta>
                      <Message size="huge" floating>
                        <b>{`Q. ${quizData[questionIndex].question}`}</b>
                      </Message>
                      <br />
                      <Item.Description>
                        <h3>choose one of your answer</h3>
                      </Item.Description>
                      <Divider />
                      <Menu vertical fluid size="massive">
                        {options.map((item, i) => {
                          let letter;
                          switch (i) {
                            case 0:
                              letter = 'A.';
                              break;
                            case 1:
                              letter = 'B.';
                              break;
                            case 2:
                              letter = 'C.';
                              break;
                            case 3:
                              letter = 'D.';
                              break;
                            default:
                              letter = i;
                              break;
                          }
                          return (
                            <Menu.Item
                              key={item}
                              name={item}
                              active={userSlectedAns === item}
                              onClick={this.handleItemClick}
                            >
                              <b style={{ marginRight: '4px' }}>{letter}</b>
                              {item}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    </Item.Meta>
                    <Divider />
                    <Item.Extra>
                      {!userSlectedAns && (
                        <Button inverted color='blue' floated="center-center" size="big" disabled>
                          Next
                          <Icon name="center-center" />
                        </Button>
                      )}
                      {userSlectedAns && (
                        <Button
                          inverted
                          color='blue'
                          floated="center-center"
                          size="big"
                          onClick={this.handleNext}
                        >
                          Next
                          <Icon name="center-center" />
                        </Button>
                      )}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Container>
        )}
        {quizIsCompleted && !resultRef && (
          <Loader text="Getting your result." />
        )}
        {quizIsCompleted && resultRef}
      </div>
    );
  }
}

export default Quiz;
