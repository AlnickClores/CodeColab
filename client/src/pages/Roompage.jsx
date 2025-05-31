import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Roompage = () => {
  const { roomId } = useParams();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(roomId);
  }, [roomId]);

  return (
    <div>
      <h1>Hello! The room id is: {sessionId}</h1>
    </div>
  );
};

export default Roompage;
