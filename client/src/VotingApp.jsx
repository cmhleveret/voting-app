import Login from "./Login";
import LoginStatus from "./LoginStatus";
import Dashboard from "./Dashboard";

const VotingApp = ({ client }) => {
  return (
    <>
      {client.token ? (
        <>
          <div className = "helloDiv">hello</div>
          <LoginStatus />
          <Dashboard client={client} />
        </>
      ) : (
        <Login client={client} />
      )}
    </>
  );
};

export default VotingApp;
