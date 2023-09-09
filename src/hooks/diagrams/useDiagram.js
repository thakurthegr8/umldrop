import React from "react";
import useFetch from "../general/useFetch";

const useDiagram = () => {
  const deleteDiagram = useFetch({
    url: "/api/diagrams/delete",
    method: "DELETE",
  });
  const updateDiagram = useFetch({
    url: "/api/diagrams/update",
    method: "PUT",
  });
  return { deleteDiagram, updateDiagram };
};

export default useDiagram;
