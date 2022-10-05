import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.146.0/testing/bdd.ts";
import { genStmts } from "./generator.ts";

describe("genStmts", () => {
  it("works single table", () => {
    const input =
      "Table suppliers {\n  id int [pk, increment]\n  name varchar\n age int\n}\n\n";
    const expected = [
      "INSERT INTO `suppliers` (`name`, `age`) VALUES ('suppliers_name_1', 1);",
    ];
    const actual = genStmts(input);
    assertEquals(actual, expected);
  });

  it("works multiple table", () => {
    const input =
      "Project scoutea {\n  database_type: 'MySQL'\n  Note: 'scoutea db'\n}\n\nTable suppliers {\n  id int [pk, increment]\n  name varchar\n}\n\nTable teas {\n  id int [pk, increment]\n  name varchar\n  stock int\n  rate float\n  supplier_id int\n}\n";
    const expected = [
      "INSERT INTO `suppliers` (`name`) VALUES ('suppliers_name_1');",
      "INSERT INTO `teas` (`name`, `stock`, `rate`, `supplier_id`) VALUES ('teas_name_1', 1, 0.5, 1);",
    ];
    const actual = genStmts(input);
    assertEquals(actual, expected);
  });
});
