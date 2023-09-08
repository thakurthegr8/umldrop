import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "@/src/hooks/general/useFetch";

const CollectionsContext = createContext(null);

export const useCollections = () => {
    const ctx = useContext(CollectionsContext);
    return ctx;
}
const CollectionsProvider = (props) => {
    const { user } = props.value;
    const [collections, setCollections] = useState(props.value.collections);
    const addCollections = useFetch({ url: "/api/collections/add", method: "POST" });
    const deleteCollection = useFetch({ url: "/api/collections/delete", method: "DELETE" });
    const mutate = (handler) => {
        setCollections(handler);
    }
    return <CollectionsContext.Provider value={{ collections, user, addCollections, deleteCollection, mutate }}>{props.children}</CollectionsContext.Provider>
}

export default CollectionsProvider;