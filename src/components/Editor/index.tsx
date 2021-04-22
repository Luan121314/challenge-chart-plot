import React from "react";
import MonacoEditor, {EditorProps} from "@monaco-editor/react";
import "./styles.css";

interface EditorComponentProps extends EditorProps{}

const Editor:React.FC<EditorComponentProps> = ({...rest}) => {

    return (
        <MonacoEditor
            className="editor-container"
            language="json"
            height={400}
            options={{  minimap: { enabled: false } }}
            theme="vs-dark"
            {...rest}
        />
    )
};


export default Editor;