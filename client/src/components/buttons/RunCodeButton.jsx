import React, { useState } from "react";
import axios from "axios";
import { languageVersions } from "../../utils/codeSnippets";

const RunCodeButton = ({ code, language, onResult }) => {
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3001/execute", {
        language,
        version: languageVersions[language] || "latest",
        files: [{ content: code }],
      });

      const data = response.data;

      if (data.run) {
        onResult({
          output: data.run.output,
          error: data.run.stderr,
        });
      } else {
        onResult({ error: "No output returned." });
      }
    } catch (error) {
      onResult({
        error: "Failed to execute code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={runCode}
      disabled={isLoading}
      className={`cursor-pointer border border-blue-500 text-blue-500 px-4 py-2 
        rounded-md text-lg font-medium transition-all
        ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-50 dark:hover:bg-blue-900"
        }`}
    >
      {isLoading ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunCodeButton;
