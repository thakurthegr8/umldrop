import React, { createContext, useContext } from "react";

const CollectionsContext = createContext(null);

export const useCollections = () => {
    const ctx = useContext(CollectionsContext);
    return ctx;
}


const CollectionsProvider = (props) => {
    return <CollectionsContext.Provider value={props.value}>{props.children}</CollectionsContext.Provider>
}

export default CollectionsProvider;