import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomInfo from "../components/ui/RoomInfo";
import LanguageSelector from "../components/ui/LanguageSelector";
import CodeEditor from "../components/ui/CodeEditor";
import { io } from "socket.io-client";
import { codeSnippets } from "../utils/codeSnippets";
import socket from "../lib/socket";

const Roompage = () => {
  const { roomId } = useParams();
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeSnippets[language]);

  useEffect(() => {
    setSessionId(roomId);
    socket.emit("join-room", roomId);

    socket.on("language-change", ({ language, code }) => {
      setLanguage(language);
      setCode(code);
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("language-change");
    };
  }, [roomId]);

  const handleLanguageSelect = (lang) => {
    const snippet = codeSnippets[lang];
    setLanguage(lang);
    setCode(snippet);
    socket.emit("language-change", { roomId, language: lang, code: snippet });
  };

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-6">
      <RoomInfo roomId={roomId} sessionId={sessionId} />
      <LanguageSelector
        onLanguageSelect={handleLanguageSelect}
        selectedLanguage={language}
      />
      <div>
        <CodeEditor
          language={language}
          roomId={roomId}
          value={code}
          setValue={setCode}
        />
      </div>
    </div>
  );
};

export default Roompage;
