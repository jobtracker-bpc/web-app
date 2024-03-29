import classNames from "classnames";
import React from "react";
import { Job } from "services/jobs/models";
import UIIcon, { UIIconType } from "../UIIcon";
import UIInput from "../UIInput";
import UIText, { UITextVariant } from "../UIText";
import UITooltip, { UITooltipPosition } from "../UITooltip";

interface UITable {
  columns: any[];
  data: any[];
  nestedRowData?: (row: any) => JSX.Element;
  headerButtons?: [JSX.Element];
  /**  Callback for when a row is clicked, returns the row data */
  handleEdit: (row: any) => void;
  /** Callback for when a row is clicked, returns the row data */
  handleDelete: (row: any) => void;
}

const UITable: React.FC<UITable> = (props) => {
  const {
    columns,
    data,
    headerButtons = [],
    handleDelete,
    handleEdit,
    nestedRowData
  } = props;

  // State
  const [search, setSearch] = React.useState<string>("");
  const [visibleNestedRows, setVisibleNestedRows] = React.useState<Set<number>>(
    new Set()
  );

  // Hooks
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      return Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [data, search]);

  // Handles opening and closing the nested row
  // Using set for O(1) lookup, and to avoid duplicates
  const handleOpenNestedRow = (rowId: number) => {
    if (visibleNestedRows.has(rowId)) {
      setVisibleNestedRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(rowId);
        return newSet;
      });
    } else {
      setVisibleNestedRows(new Set([...visibleNestedRows, rowId]));
    }
  };

  // Render
  return (
    <div className="relative overflow-x-auto rounded-lg bg-slate-800">
      {/* Header */}
      <div className="flex justify-between border-b border-gray-600 px-6 py-6 text-white">
        <UIInput
          value={search}
          className="w-72 border-gray-700 bg-slate-900 text-white hover:ring-slate-600 focus:border-gray-500 focus:ring-gray-500"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Table Header Buttons */}
        <div className="space-x-4">
          {headerButtons.map((button, index) => (
            <div key={index} className="inline-block">
              {button}
            </div>
          ))}
        </div>
      </div>
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
          </tr>
        </thead>
        <tbody>
          {filteredData.length ? (
            filteredData.map((row) => {
              return (
                <>
                  <tr className="border-b border-gray-300">
                    {columns.map((column, index) => (
                      <td className="bg-gray-200 px-6 py-3 text-left">
                        <div className="flex items-center space-x-4">
                          {/* Nested Row Chevron Button */}
                          {index === 0 && nestedRowData && (
                            <UIIcon
                              type={UIIconType.ChevronDown}
                              onClick={() => handleOpenNestedRow(row.id)}
                              className={classNames(
                                "-rotate-90 transform cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-slate-300 hover:text-gray-900",
                                {
                                  "!rotate-0 transform": visibleNestedRows.has(
                                    row.id
                                  )
                                }
                              )}
                            />
                          )}
                          <UIText
                            variant={UITextVariant.body2}
                            className="!text-sm"
                          >
                            {String(row[column.key]) || "--"}
                          </UIText>
                        </div>
                      </td>
                    ))}
                    {/* Edit Icons Container */}
                    <td className=" bg-gray-200 px-6 py-3 text-left">
                      <div className="flex h-full flex-row justify-end">
                        {/* Edit */}
                        <UITooltip text="Edit">
                          <UIIcon
                            type={UIIconType.Edit}
                            onClick={() => handleEdit(row)}
                            className="cursor-pointer rounded-lg p-2 text-2xl text-gray-700 hover:bg-slate-300 hover:text-gray-900"
                          />
                        </UITooltip>
                        {/* Delete */}
                        <UITooltip text="Delete">
                          <UIIcon
                            type={UIIconType.Delete}
                            onClick={() => handleDelete(row)}
                            className="cursor-pointer rounded-lg p-2 text-2xl text-red-600 hover:bg-slate-300 hover:text-red-700"
                          />
                        </UITooltip>
                      </div>
                    </td>
                  </tr>
                  {/* Nested Row */}
                  {nestedRowData && visibleNestedRows.has(row.id) ? (
                    <tr className="border-b border-gray-300 bg-slate-100">
                      <td colSpan={columns.length + 1} className="p-6">
                        {nestedRowData(row)}
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })
          ) : (
            <tr className="border-b border-gray-300">
              <td
                colSpan={1000}
                className="w-full bg-gray-200 px-6 py-3 text-left"
              >
                <UIText variant={UITextVariant.body2}>No results found.</UIText>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Footer Placeholder */}
      <div className="px-6 py-6"></div>
    </div>
  );
};

export default UITable;
