import { objectType } from "webql-nexus-schema";

export const PersonType = objectType({
  name: "Person",
  definition(t) {
    t.string("foaf#name", {
      description: "A person's name",
    });
  },
});
