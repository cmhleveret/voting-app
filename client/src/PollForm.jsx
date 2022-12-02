import { Button, Container, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import PollFormValidation from "./pollFormValidation";
import './pollForm.css'

function PollForm({ client }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().getTime());
  let dateTime = new Date(date + " " + time).getTime();

  const defaultValues = {
    title: "",
    options: [
      {
        name: "",
        url: "",
        votes: 0
      },
      {
        name: "",
        url: "",
        votes: 0
      },
      {
        name: "",
        url: "",
        votes: 0
      },
      {
        name: "",
        url: "",
        votes: 0
      },
    ],
    endTime: ""
  }

  const errorsInitial = {
    title: false,
    options: [false, false, false, false],
    optionsUrls: [false, false, false, false],
    notEnoughOptions: false,
    date: false,
    time: false,
    dateTime: false,
    submitForm: false,
  }

  const [pollFormValues, changePollFormValues] = useState(defaultValues);
  const [errors, changeErrors] = useState(errorsInitial);
  const [validated, changeValidated] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const newState = { ...pollFormValues };
    newState[event.target.name] = event.target.value;
    changePollFormValues(newState);
  }

  const handleOptionChange = (event, optionIndex) => {
    event.preventDefault();
    const newState = {
      ...pollFormValues,
    }
    newState.options[optionIndex][event.target.name] = event.target.value
    changePollFormValues(newState);
  }

  const isTheFormValid = () => {
    let workingErrors = PollFormValidation(pollFormValues, date, time, dateTime);
    changeErrors(workingErrors);
    const arrayOfTruth = Object.keys(workingErrors)
      .map((x) => {
        if (typeof workingErrors[x] === 'object') {
          return workingErrors[x].some((y) => y)
        } else {
          return workingErrors[x]
        }
      });
    return arrayOfTruth.every((x) => !x);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const canSubmit = isTheFormValid();
    if (canSubmit) {
      client.createPoll({
        ...pollFormValues,
        endTime: Date.now()// change the date tiem to a number here
      })
        .then(() => client.getPolls())
        .then(({ data }) => {
          client.changePolls(data);
          changePollFormValues(defaultValues)
          changeValidated(false)
          handleClose();
        })
    } else {
      changeValidated(canSubmit);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create new poll
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={(event) => submitHandler(event)}>
            <Form.Group controlId="pollTitle">
              <Form.Label>What would you like to suggest?</Form.Label>
              <Form.Text className="text-muted">
                <Form.Control
                  name="title"
                  type="text"
                  value={pollFormValues.title}
                  isInvalid={errors.title}
                  placeholder="e.g. best mexican in Sheffield"
                  onChange={(event) => handleChange(event)}
                />
                <Form.Control.Feedback type="invalid">{"Name must contain more than one character"}</Form.Control.Feedback>
              </Form.Text>
            </Form.Group>
            {["One", "Two", "Three", "Four"].map((option, i) => (
              <>
                <Form.Group controlId={`pollOption${option}Name`}>
                  <Form.Label>{`Option ${option}`}</Form.Label>
                  <Form.Text className="text-muted">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="enter name here"
                      value={pollFormValues.options[i].name}
                      isInvalid={errors.options[i]}
                      onChange={(event) => handleOptionChange(event, i)}
                    />
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId={`pollOption${option}Url`}>
                  <Form.Text className="text-muted">
                    <Form.Control type="text"
                      name="url"
                      placeholder="enter URL here"
                      value={pollFormValues.options[i].url}
                      isInvalid={errors.optionsUrls[i]}
                      onChange={(event) => handleOptionChange(event, i)}
                    />
                  </Form.Text>
                </Form.Group>
              </>
            ))}

            <Form.Group controlId="duedate">
              <Form.Label>Add end date and time:</Form.Label>
              <Form.Control
                type="date"
                name="duedate"
                placeholder="Due date"
                value={date}
                isInvalid={errors.date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="duetime">
              <Form.Control
                type="time"
                name="duetime"
                placeholder="Due time"
                value={time}
                isInvalid={errors.time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            {errors.dateTime ? <Container class="dateTimeError">Please Enter a date and time in the future</Container> : ""}
            <Button type="submit" variant="primary" >
              submit Poll
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className = "loginButtons" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className = "loginButtons" variant="primary" onClick={() => setDateTimeString(new Date([date,':',time].join('')).getTime())}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default PollForm;