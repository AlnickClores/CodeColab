import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomInfo from "../components/ui/RoomInfo";

const Roompage = () => {
  const { roomId } = useParams();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(roomId);
  }, [roomId]);

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-6">
      <RoomInfo roomId={roomId} sessionId={sessionId} />
    </div>
  );
};

export default Roompage;
