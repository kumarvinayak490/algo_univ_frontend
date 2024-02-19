/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import MonacoEditor from "@monaco-editor/react";
import { CiPlay1 } from "react-icons/ci";
import Container from "../../component/common/Container";
import Layout from "../layout";
import { getResult, runCode } from "../../api/ide";

const Editor = () => {
  const [code, setCode] = useState("#write your code");
  const [taskStatus, setTaskStatus] = useState("");
  const [result, setResult] = useState("");

  // Todo
  // const [containerHeight, setContainerHeight] = useState(0);
  // const editorContainerRef = useCallback((node: HTMLDivElement) => {
  //   if (node !== null) {
  //     setContainerHeight(node.offsetHeight);
  //   }
  // }, []);

  const monitorTaskStatus = async (taskId: string) => {
    try {
      const response = await getResult<{ status: string; result: string }>(
        taskId
      );
      const { status, result } = response;
      setTaskStatus(status);
      if (status === "SUCCESS") {
        setTaskStatus(status);
        setResult(result);
      } else if (status === "PENDING" || status === "STARTED") {
        setTimeout(() => {
          monitorTaskStatus(taskId);
        }, 1000); // Poll every 1 second
      }
    } catch (error) {
      console.error("Error monitoring task status:", error);
    }
  };

  const handleRunCode = async () => {
    const token = JSON.parse(localStorage.getItem("token") || '""');
    if (token) {
      const decoded = jwtDecode<{ user_id: string; username: string }>(token);
      console.log(decoded);
      try {
        const res = await runCode<{ task_id: string }>({
          code,
          language: "python",
          user: decoded.user_id,
        });
        monitorTaskStatus(res.task_id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  return (
    <Layout>
      <Container className="w-full h-[calc(100vh-5rem)] flex ">
        <div className="h-full w-3/5   ">
          <div className="w-full p-2 py-4 bg-gray-800 border-b border-cyan-700 flex justify-between items-center  ">
            <button
              onClick={handleRunCode}
              type="button"
              className="text-gray-50  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2   bg-gray-700 flex items-center  gap-2 hover:bg-gray-700"
            >
              <CiPlay1 />
              <span>Run Code</span>
            </button>
            <form className="w-1/3">
              <select
                value="python"
                id="languages"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a language</option>
                <option value="c++">C++</option>
                <option value="python">Python</option>
                <option value="Javascript">Javascript</option>
                <option value="Go">Go</option>
              </select>
            </form>
          </div>
          <div className="w-full bg-[#1e1e1e] p-4 ">
            <MonacoEditor
              options={{
                // Enable semantic highlighting for better syntax highlighting
                "semanticHighlighting.enabled": true,
                // Enable suggestion on typing characters like '.' or ':'.
                acceptSuggestionOnCommitCharacter: true,
                // Enable automatic indentation according to the previous line
                autoIndent: "full",
                // Enable selection highlight on line numbers
                selectOnLineNumbers: true,
                // Enable rounded selection
                roundedSelection: false,
                // Allow editing
                readOnly: false,
                // Set cursor style to line
                cursorStyle: "line",
                // Enable word wrapping
                wordWrap: "on",
                // Set tab size to 2 spaces
                tabSize: 2,
                // Enable code folding
                folding: true,
                // Enable line numbers
                lineNumbers: "on",
                // Enable minimap to provide a preview of the full code
                minimap: {
                  enabled: true,
                },
                // Enable code lens to show references and other information inline
                codeLens: true,

                // Enable code actions on save

                // Enable automatic closing of brackets, quotes, and more
                autoClosingBrackets: "always",
                autoClosingQuotes: "always",
                autoClosingOvertype: "always",
                // Enable automatic formatting on type
                formatOnType: true,
                // Enable automatic formatting on paste
                formatOnPaste: true,
                // Enable suggestions on trigger characters
                suggestOnTriggerCharacters: true,
              }}
              height="70vh"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorMount}
            />
          </div>
        </div>
        <div className="h-full w-2/5 flex flex-col  ">
          <div className="bg-gray-800 border-l border-l-cyan-800 p-4 flex items-center justify-between ">
            <h1 className="text-xl text-gray-100 flex items-center gap-x-4">
              Output:
              {taskStatus && (
                <span className="text-gray-50  font-medium rounded-full text-sm px-5 py-2.5 text-center    bg-gray-900 flex items-center  gap-2 hover:bg-gray-700">
                  {taskStatus}
                </span>
              )}
            </h1>
            <div>
              <button
                onClick={() => {
                  setResult("");
                  setTaskStatus("");
                }}
                type="button"
                className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Clear Console
              </button>
            </div>
          </div>
          <div className="bg-slate-600 flex-1">
            <div className="w-full h-full bg-gray-700 p-4">
              <h1 className="text-gray-200">{result}</h1>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Editor;
