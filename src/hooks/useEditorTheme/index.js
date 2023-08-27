import { useMonaco } from "@monaco-editor/react";
import Theme from "monaco-themes/themes/Blackboard.json";
import { useEffect } from "react";

const useEditorTheme = () => {
  const monaco = useMonaco();
  useEffect(() => {
    monaco?.editor.defineTheme("my-theme", Theme);
  }, [monaco]);
  return monaco;
};

export default useEditorTheme;
