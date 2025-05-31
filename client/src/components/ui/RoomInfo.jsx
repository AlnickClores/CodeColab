import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const RoomInfo = ({ roomId, sessionId }) => {
  const [copied, setCopied] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.emit("join-room", roomId);
    socket.on("user-count", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("user-count");
    };
  }, [roomId]);

  const copyRoomId = () => {
    try {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room ID:", err);
    }
  };
  return (
    <div className="flex flex-col justify-between sm:flex-row p-4 bg-white dark:bg-slate-800 shadow-md rounded-md space-y-3">
      <div className="flex items-center gap-5">
        <div>
          <h1 className="font-semibold text-black dark:text-white text-2xl">
            Room: {sessionId}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Share this room ID with your coding buddy.
          </p>
        </div>
        <button
          onClick={copyRoomId}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          )}
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>
      <div>
        <h1 className="font-semibold text-black dark:text-white">
          {activeUsers} {activeUsers === 1 ? "person" : "people"} online
        </h1>
      </div>
    </div>
  );
};

export default RoomInfo;
