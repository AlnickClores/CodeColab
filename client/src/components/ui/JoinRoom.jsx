import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-status", ({ roomId, exists }) => {
      if (exists) {
        setError("");
        socket.emit("join-room", roomId);
        navigate(`/room/${roomId}`);
      } else {
        setError(
          "Room does not exist. Please check the room code and try again."
        );
      }
    });

    return () => {
      socket.off("room-status");
    };
  }, [navigate]);

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      socket.emit("check-room", roomId.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="flex-1 text-center text-black dark:text-white border border-slate-500 rounded-md py-1"
        />
        <button
          onClick={handleJoinRoom}
          className="cursor-pointer w-full px-8 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          Join Room
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Have a room code? Enter it above to join your coding buddy.
      </p>
    </div>
  );
};

export default JoinRoom;
