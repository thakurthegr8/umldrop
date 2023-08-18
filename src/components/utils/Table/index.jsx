import React from "react";

const Table = (props) => {
  console.log(props.dataset);
  return (
    <table className="w-full divide-y table-fixed text-sm">
      <tr className="py-3">
        {props.cols.map((item, index) => (
          <th key={index} className="text-left">
            {item.placeholder}
          </th>
        ))}
      </tr>
      {props.dataset.length !== 0 &&
        props.dataset.map((item, index) => (
          <tr key={index} className=" capitalize">
            {props.cols.map((col, colIdx) => (
              <td key={colIdx} className="py-2">
                {col?.render != null
                  ? col.render(item?.[col.key], item, col.target)
                  : item?.[col.key]}
              </td>
            ))}
          </tr>
        ))}
    </table>
  );
};

export default Table;