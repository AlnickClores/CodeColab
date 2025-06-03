import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useState, useEffect } from "react";
import { codeSnippets } from "../../utils/codeSnippets";
import OutputBox from "./OutputBox";

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
        <div className="flex flex-col">
          <div className="flex-shrink-0 mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Code Editor
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <div className="flex-1 min-h-0">
            <div className="h-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
              <Editor
                height="100%"
                theme={theme === "dark" ? "vs-dark" : "vs"}
                language={language}
                value={value}
                onChange={(value) => setValue(value)}
                onMount={onMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineHeight: 1.5,
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-shrink-0 mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Output
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <div className="flex-1 min-h-0">
            <OutputBox editorRef={editorRef} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
