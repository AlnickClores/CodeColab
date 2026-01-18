import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import socket from "../../lib/socket";
import { useState } from "react";

const CreateRoomButton = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    setError("");
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Server not responding");
        const roomId = nanoid(6);
        socket.emit("create-room", roomId);
        navigate(`/room/${roomId}`);
        console.log("Room created with ID:", roomId);
        setLoading(false);
      } catch (err) {
        setError(
          "Server is not running. Please start the server and try again.",
        );
        setLoading(false);
        console.error("Error creating room:", err);
      }
    }, 3000);
  };

  return (
    <>
      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className={`flex items-center justify-center text-white w-full px-8 py-2 rounded-md text-lg font-medium cursor-pointer ${loading ? "bg-blue-900 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? (
          <>
            Creating New Room{" "}
            <Loader className="ml-2 mt-1 h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            Create New Room <ArrowRight className="ml-2 mt-1 h-5 w-5" />
          </>
        )}
      </button>
      {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
    </>
  );
};

export default CreateRoomButton;
