import { useState, useEffect } from "react";
import { languageVersions } from "../../utils/codeSnippets";
import socket from "../../lib/socket";

const OutputBox = ({ editorRef, language, roomId }) => {
  const [result, setResult] = useState({ output: "", error: "" });

  const handleRun = () => {
    const code = editorRef.current?.getValue?.() || "";
    if (!code) {
      setResult({ error: "No code to execute." });
      return;
    }

    socket.emit("run-code", {
      code,
      language,
      version: languageVersions[language] || "latest",
      roomId,
    });
  };

  useEffect(() => {
    const handleOutput = (data) => {
      setResult({
        output: data.output,
        error: data.error,
      });
    };

    socket.on("code-output", handleOutput);

    return () => {
      socket.off("code-output", handleOutput);
    };
  }, [socket]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRun}
          className="cursor-pointer border border-blue-500 text-blue-500 px-4 py-2 rounded-md text-lg font-medium transition-all hover:bg-blue-50 dark:hover:bg-blue-900"
        >
          Run Code
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <div className="h-full p-4 sm:p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm overflow-auto">
          {result.output || result.error ? (
            <pre className="whitespace-pre-wrap text-sm text-left text-slate-800 dark:text-slate-200">
              {result.error || result.output}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400 dark:text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Ready to Execute
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">
                  Click the "Run Code" button to see the output here. Your{" "}
                  {language} code will be executed and results displayed below.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputBox;
