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
      "Project sample {\n  database_type: 'MySQL'\n  Note: 'sample db'\n}\n\nTable suppliers {\n  id int [pk, increment]\n  name varchar\n}\n\nTable teas {\n  id int [pk, increment]\n  name varchar\n  stock int\n  rate float\n expiration_date date\n expired boolean\n supplier_id int\n}\n";
    const expected = [
      "INSERT INTO `suppliers` (`name`) VALUES ('suppliers_name_1');",
      "INSERT INTO `teas` (`name`, `stock`, `rate`, `expiration_date`, `expired`, `supplier_id`) VALUES ('teas_name_1', 1, 0.5, '2022-10-12', false, 1);",
    ];
    const actual = genStmts(input);
    assertEquals(actual, expected);
  });
});
