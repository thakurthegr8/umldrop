const { createContext } = require("react");

const EditorContext = createContext(null);

export const useEditor = () => useContext(EditorContext);

const EditorProvider = ()=>{
    
    <EditorContext.Provider>
        
    </EditorContext.Provider>
}