import { genStmts } from "./generator.ts";

const rawDbml = Deno.readFileSync("./sample.dbml");
const decoder = new TextDecoder("utf-8");
const dbml = decoder.decode(rawDbml);

const stmts = genStmts(dbml);
console.log(stmts);
