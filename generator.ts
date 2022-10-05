import { Parser } from "https://esm.sh/@dbml/core@2.4.2";

export const genStmts = (dbml: string): string[] => {
  const db = Parser.parse(dbml, "dbml");
  const table = db.schemas[0].tables[0];
  const v = table.fields.reduce(
    (acc, field) => {
      if (field.increment) {
        return acc;
      }

      const colStr = `\`${field.name}\``;
      acc.columnsStr =
        acc.columnsStr === "" ? colStr : acc.columnsStr.concat(", ", colStr);

      const colType: string = field.type.type_name;
      let valStr = "";
      switch (colType) {
        case "varchar":
          valStr = `'${singularize(field.table.name)}_${field.name}_1'`;
          break;
        case "int":
          valStr = "1";
          break;
        case "float":
          valStr = "0.5";
          break;
      }

      acc.valuesStr =
        acc.valuesStr === "" ? valStr : acc.valuesStr.concat(", ", valStr);
      return acc;
    },
    {
      columnsStr: "",
      valuesStr: "",
    }
  );
  const stmt = `INSERT INTO \`${table.name}\` (${v.columnsStr}) VALUES (${v.valuesStr});`;
  return [stmt];
};

// TODO: 実装する
const singularize = (s: string): string => {
  return s;
};
