import { genStmts } from "./generator.ts";
import { parse } from "https://deno.land/std@0.158.0/flags/mod.ts";

const args = parse(Deno.args);
const inputFile = args.in ?? "./sample.dbml";
const outFile: string | boolean | null = args.o || null;
const dbml = Deno.readTextFileSync(inputFile);
const stmts = genStmts(dbml);

if (outFile) {
  const out = typeof outFile === "string" ? outFile : "out.sql";
  Deno.writeTextFileSync(out, stmts.join("\n"));
} else {
  stmts.forEach((stmt) => console.log(stmt));
}
