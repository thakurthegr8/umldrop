import React, { createContext } from 'react'

export const QuestionContext = createContext(null);

const QuestionProvider = (props) => {
    return (
        <QuestionContext.Provider value={props.payload}>
            {props.children}
        </QuestionContext.Provider>
    )
}

export default QuestionProvider;