import { Card, ListGroup, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import toastr from "toastr";
import { sortBy } from "lodash";
import { useParams } from "react-router-dom";
import Countdown from "./Countdown";

const Polls = ({ client }) => {
  const [show, setShow] = useState(false);
  const [selectedOptionIndex, changeSelectedOptionIndex] = useState(undefined);
  const [selectedPoll, changeSelectedPoll] = useState(undefined);

  const { pollid } = useParams();
  const singularPoll = client.polls.filter((poll) => poll._id == pollid);
  const isSinglePoll = pollid !== undefined;

  const sortedPolls = sortBy(client.polls, (poll) => poll.endTime);

  const visiblePolls = isSinglePoll ? singularPoll : sortedPolls;

  const handleDelete = (id) => {
    client.deletePoll(id)
      .then(() => {
        client.getPolls()
      }
      )
  }

  const handleClose = () => setShow(false);
  const handleShow = (poll, optionIndex) => {
    changeSelectedOptionIndex(optionIndex);
    changeSelectedPoll(poll);
    setShow(true);
  };
  const handleVote = () => {
    setShow(false);
    client
      .vote(selectedPoll._id, selectedOptionIndex)
      .then(() => client.getPolls())
      .then(({ data }) => {
        client.changePolls(data);
        toastr["success"]("Congratulations on casting your vote!");
      })
      .catch((error) => {
        toastr["error"](error.response.statusText);
      });
  };

  return (
    <>
      {visiblePolls.map((poll) => {
        const pollExpired = poll.endTime < Date.now();
        return (
          <Card
            className={`${pollExpired ? "expiredCard" : "pollCard"}`}
            key={poll._id}
          >
            <Card.Body>
              <Card.Title className="cardTitle">{poll.title}</Card.Title>
              <Card.Subtitle className="cardOptions">Options:</Card.Subtitle>
              {poll.options.map((option, i) => (
                <ListGroup variant="flush" key={i}>
                  <ListGroup.Item action href={`http://${option.url}`}>
                    {option.name}
                  </ListGroup.Item>
                  {option.votes !== undefined && (
                    <ListGroup.Item>{option.votes}</ListGroup.Item>
                  )}
                  {!poll.usersVoted.includes(client.userid) && !pollExpired && (
                    <Button
                      variant="primary"
                      onClick={() => handleShow(poll, i)}
                    >
                      Vote
                    </Button>
                  )}
                </ListGroup>
              ))}
              {!pollExpired && <Countdown endTime={poll.endTime} />}
            </Card.Body>
            {client.isAdmin ? <Button onClick={() => handleDelete(current._id)}>Delete</Button> : ""}
          </Card>
        );
      })}

      {selectedOptionIndex !== undefined && selectedPoll && (
        <Modal show={show} onHide={handleClose} dialogClassName="confirmVote">
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="confirmVote">Confirm Vote</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{`Confirm Vote for ${selectedPoll.options[selectedOptionIndex].name}`}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleVote}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Polls;
