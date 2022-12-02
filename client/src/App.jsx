import { Route, Routes } from "react-router-dom";


import { Container } from "react-bootstrap";

import Signup from "./Signup";
import "./App.css";
import VotingApp from "./VotingApp";

const App = ({ client }) => {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<VotingApp client={client} />} />

        <Route
          exact
          path="/newuser"
          element={<Signup client={client} />} //signup
        />
      </Routes>
    </Container>
  );
};

export default App;
