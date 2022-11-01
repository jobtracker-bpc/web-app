import React from "react";

interface UITable {
  columns: string[];
  data: any[];
}

const UITable: React.FC<UITable> = (props) => {
  const columns = [
    { title: "Title", key: "title" },
    { title: "Company", key: "company" },
    { title: "URL", key: "url" }
  ];
  const rows = [
    { title: "Software Engineer", company: "Google", url: "google.com" }
  ];

  // Render
  return (
    <table className="border">
      <tbody className="flex flex-col">
        <tr className="border">
          {columns.map((column) => (
            <th className="border">{column.title}</th>
          ))}
        </tr>
        {rows.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UITable;
