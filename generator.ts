import { Parser } from "https://esm.sh/@dbml/core@2.4.2";

export const genStmts = (dbml: string): string[] => {
  const db = Parser.parse(dbml, "dbml");
  return db.schemas[0].tables.map((table) => {
    const res = table.fields.reduce(
      (acc, field) => {
        if (field.increment) {
          return acc;
        }

        const colStr = `\`${field.name}\``;
        acc.columnsStr = concatedStrFrom(acc.columnsStr, colStr);

        const valStr = valueStrFrom(
          field.type.type_name,
          field.table.name,
          field.name
        );
        acc.valuesStr = concatedStrFrom(acc.valuesStr, valStr);
        return acc;
      },
      {
        // e.g. "`name`, `stock`, `rate`, `supplier_id`"
        columnsStr: "",
        // e.g. "'teas_name_1', 1, 0.5, 1"
        valuesStr: "",
      }
    );
    return `INSERT INTO \`${table.name}\` (${res.columnsStr}) VALUES (${res.valuesStr});`;
  });
};

const concatedStrFrom = (prev: string, current: string) => {
  return prev === "" ? current : prev.concat(", ", current);
};

const valueStrFrom = (
  colType: "varchar" | "int" | "float",
  tableName: string,
  colName: string
): string => {
  switch (colType) {
    case "varchar":
      return `'${singularize(tableName)}_${colName}_1'`;
    case "int":
      return "1";
    case "float":
      return "0.5";
  }
};

// TODO: implement
const singularize = (s: string): string => {
  return s;
};
