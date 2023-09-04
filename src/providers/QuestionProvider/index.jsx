import React, { createContext } from 'react'

export const DiagramContext = createContext(null);

const DiagramProvider = (props) => {
    return (
        <DiagramContext.Provider value={props.payload}>
            {props.children}
        </DiagramContext.Provider>
    )
}

export default DiagramProvider;