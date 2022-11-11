import classNames from "classnames";
import React from "react";
import UIButton from "../UIButton";
import UIText, { UITextVariant } from "../UIText";

interface UITable {
  columns: any[];
  data: any[];
  handleDelete: (jobId: number) => void;
}

const UITable: React.FC<UITable> = (props) => {
  const { columns, data, handleDelete: handleDelete } = props;

  // Render
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              className="border border-gray-600 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              {column.title}
            </th>
          ))}
          <th className="border border-gray-600 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td className={"border border-gray-400 text-left"}>
                <UIText variant={UITextVariant.body2}>{row[column.key]}</UIText>
              </td>
            ))}
            <td className={"border border-gray-400 text-left"}>
              <UIButton onClick={() => handleDelete(row.id)}>
                Delete
              </UIButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UITable;
