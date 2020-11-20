import { join } from "path";
import { makeSchema } from "webql-nexus-schema";
import types from "./objects";

export const schema = makeSchema({
  outputs: {
    // typegen: join(__dirname, "../../node_modules/@nexus-typegen/index.d.ts"),
    // schema: join(__dirname, "../../node_modules/@generated/schema.graphql"),
    typegen: join(__dirname, "./index.d.ts"),
    schema: join(__dirname, "./schema.graphql"),
  },
  types: types,
});
