import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useState, useEffect, useCallback } from "react";
import { codeSnippets } from "../../utils/codeSnippets";
import OutputBox from "./OutputBox";
import { io } from "socket.io-client";
import { getUserColor } from "../../utils/userColors";
import * as monaco from "monaco-editor";
import socket from "../../lib/socket";

const CodeEditor = ({ language = "javascript", roomId, value, setValue }) => {
  const { theme } = useTheme();
  const editorRef = useRef();
  const [codeValue, setCodeValue] = useState(() => {
    const savedCode = sessionStorage.getItem(`code-${roomId}`);
    return savedCode || codeSnippets[language];
  });

  const decorationsRef = useRef([]);

  useEffect(() => {
    if (value !== undefined) {
      sessionStorage.setItem(`code-${roomId}`, value);
    }
  }, [value, roomId]);

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [language, roomId]);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("code-change", ({ code }) => {
      if (editorRef.current && code !== editorRef.current.getValue()) {
        const editor = editorRef.current;
        const position = editor.getPosition();
        const selections = editor.getSelections();
        const scrollTop = editor.getScrollTop();
        const scrollLeft = editor.getScrollLeft();

        editor.setValue(code);

        editor.setPosition(position);
        editor.setSelections(selections);
        editor.setScrollTop(scrollTop);
        editor.setScrollLeft(scrollLeft);
      }
    });

    socket.on("cursor-change", ({ userId, position }) => {
      if (!editorRef.current) return;

      const color = getUserColor(userId);
      const decorations = editorRef.current.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
            options: {
              className: "remote-cursor",
              beforeContentClassName: `remote-cursor-${userId}`,
            },
          },
        ]
      );
      decorationsRef.current = decorations;

      const styleEl = document.querySelector(`#cursor-style-${userId}`);
      if (!styleEl) {
        const style = document.createElement("style");
        style.id = `cursor-style-${userId}`;
        style.innerHTML = `
          .monaco-editor .remote-cursor-${userId}::before {
            content: "";
            display: inline-block;
            background-color: ${color};
            width: 2px;
            height: 100%;
            position: absolute;
          }
        `;
        document.head.appendChild(style);
      }
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("code-change");
      socket.off("cursor-change");
    };
  }, [roomId]);

  const debounce = (func, wait, immediate = false) => {
    let timeout;
    return (...args) => {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  };

  const debouncedEmit = useCallback(
    debounce((code) => {
      socket.emit("code-change", { roomId, code });
    }, 100),
    [roomId]
  );

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    let isUpdating = false;

    editor.onDidChangeModelContent((event) => {
      if (isUpdating) return;

      const code = editor.getValue();
      setCodeValue(code);

      if (event.isFlush) return;

      debouncedEmit(code);
    });

    socket.on("code-change", ({ code }) => {
      if (!editorRef.current || code === editorRef.current.getValue()) return;

      const editor = editorRef.current;
      const position = editor.getPosition();
      const selections = editor.getSelections();
      const scrollTop = editor.getScrollTop();
      const scrollLeft = editor.getScrollLeft();

      isUpdating = true;
      editor.executeEdits("remote", [
        {
          range: editor.getModel().getFullModelRange(),
          text: code,
        },
      ]);
      isUpdating = false;

      editor.setPosition(position);
      editor.setSelections(selections);
      editor.setScrollTop(scrollTop);
      editor.setScrollLeft(scrollLeft);
    });

    editor.onDidChangeCursorPosition(
      debounce((e) => {
        socket.emit("cursor-change", {
          roomId,
          position: e.position,
          userId: socket.id,
        });
      }, 50)
    );
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(`code-${roomId}`, newValue);
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
                onChange={handleChange}
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
            <OutputBox
              editorRef={editorRef}
              language={language}
              roomId={roomId}
              socket={socket}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
