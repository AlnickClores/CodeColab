import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { nanoid } from "nanoid";
import socket from "../../lib/socket";
import { useState } from "react";

const CreateRoomButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Server not responding");
      const roomId = nanoid(6);
      socket.emit("create-room", roomId);
      navigate(`/room/${roomId}`);
      console.log("Room created with ID:", roomId);
    } catch (err) {
      setError("Server is not running. Please start the server and try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleCreateRoom}
        className="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-full px-8 py-2 rounded-md text-lg font-medium"
      >
        Create New Room
        <ArrowRight className="ml-2 mt-1 h-5 w-5" />
      </button>
      {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
    </>
  );
};

export default CreateRoomButton;
