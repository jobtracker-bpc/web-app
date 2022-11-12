import classNames from "classnames";
import React from "react";
import UIButton from "../UIButton";
import UIIcon, { UIIconType } from "../UIIcon";
import UIText, { UITextVariant } from "../UIText";

interface UITable {
  columns: any[];
  data: any[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const UITable: React.FC<UITable> = (props) => {
  const { columns, data, handleDelete, handleEdit } = props;

  // Render
  return (
    <div className="relative overflow-x-auto rounded-lg bg-gray-800">
      <table className="w-full">
        <thead>
          <tr className="">
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200"
              >
                {column.title}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td className="bg-gray-200 px-6 py-3 text-left">
                  <UIText variant={UITextVariant.body2}>
                    {row[column.key]}
                  </UIText>
                </td>
              ))}
              <td className=" bg-slate-200 px-6  py-3 text-left">
                <div className="flex h-full flex-row justify-end space-x-6">
                  <UIIcon
                    type={UIIconType.Edit}
                    onClick={() => handleEdit(row.id)}
                    className="cursor-pointer text-2xl text-gray-700 hover:text-gray-500"
                  />
                  <UIIcon
                    type={UIIconType.Delete}
                    onClick={() => handleDelete(row.id)}
                    className="cursor-pointer text-2xl text-red-600 hover:text-red-400"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UITable;
