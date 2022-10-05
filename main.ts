import { Parser } from "https://esm.sh/@dbml/core@2.4.2";

const rawDbml = Deno.readFileSync("./sample.dbml");
const decoder = new TextDecoder("utf-8");
const dbml = decoder.decode(rawDbml);

const db = Parser.parse(dbml, "dbml");
console.log(db);
