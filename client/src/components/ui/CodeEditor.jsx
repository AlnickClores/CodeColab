import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useState, useEffect } from "react";
import { codeSnippets } from "../../utils/codeSnippets";

const CodeEditor = ({ language = "javascript" }) => {
  const { theme } = useTheme();
  const editorRef = useRef();
  const [value, setValue] = useState(codeSnippets[language]);

  useEffect(() => {
    setValue(codeSnippets[language]);
  }, [language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div>
      <Editor
        height="50vh"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        language={language}
        value={value}
        onChange={(value) => setValue(value)}
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditor;
