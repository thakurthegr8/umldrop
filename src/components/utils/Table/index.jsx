import React from "react";
import Typography from "../Typography";

const Table = (props) => {
  return (
    <table className="w-full table-fixed text-sm divide-y divide-dark_secondary">
      <tr className="py-3 bg-dark_secondary/50">
        {props?.cols && props.cols.map((item, index) => (
          <th key={index} className="text-left">
            {item.placeholder}
          </th>
        ))}
      </tr>
      {props.dataset.length !== 0 ?
        props.dataset.map((item, index) => (
          <tr key={index} className="capitalize">
            {props.cols.map((col, colIdx) => (
              <td key={colIdx} className="py-2">
                {col?.render != null
                  ? col.render(item?.[col.key], item, col.target)
                  : item?.[col.key]}
              </td>
            ))}
          </tr>
        )) : <tr><td colSpan={props.cols.length}>No data to show</td></tr>}
    </table>
  );
};

export default Table;