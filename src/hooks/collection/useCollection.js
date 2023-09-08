import React from "react";
import useFetch from "../general/useFetch";

const useCollection = () => {
  const deleteCollection = useFetch({
    url: "/api/collections/delete",
    method: "DELETE",
  });
  const updateCollection = useFetch({
    url: "/api/collections/update",
    method: "PUT",
  });
  return { deleteCollection, updateCollection };
};

export default useCollection;
