import PollForm from "./PollForm";
import Polls from "./Polls";

const Dashboard = ({ client }) => {

  
  return (
    <>
      {client.isAdmin && <PollForm client={client} />}
      <Polls client={client} />
    </>
  );
}

export default Dashboard;
