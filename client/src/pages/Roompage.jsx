import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomInfo from "../components/ui/RoomInfo";
import LanguageSelector from "../components/ui/LanguageSelector";
import CodeEditor from "../components/ui/CodeEditor";

const Roompage = () => {
  const { roomId } = useParams();
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setSessionId(roomId);
  }, [roomId]);

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-6">
      <RoomInfo roomId={roomId} sessionId={sessionId} />
      <LanguageSelector
        onLanguageSelect={setLanguage}
        selectedLanguage={language}
      />
      <div>
        <CodeEditor language={language} roomId={roomId} />
      </div>
    </div>
  );
};

export default Roompage;
