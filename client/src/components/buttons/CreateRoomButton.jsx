import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const CreateRoomButton = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = nanoid(6);
    socket.emit("create-room", roomId);
    navigate(`/room/${roomId}`);
    console.log("Room created with ID:", roomId);
  };

  return (
    <button
      onClick={handleCreateRoom}
      className="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-full px-8 py-2 rounded-md text-lg font-medium"
    >
      Create New Room
      <ArrowRight className="ml-2 mt-1 h-5 w-5" />
    </button>
  );
};

export default CreateRoomButton;
