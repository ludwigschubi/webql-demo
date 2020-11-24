import { objectType } from "webql-nexus-schema";

export const PersonType = objectType({
  name: "Person",
  definition(t) {
    t.id("id");
    t.string("foaf#name", {
      description: "A person's name",
    });
    t.string("vcard#role", {
      description: "A person's occupation",
    });
    t.field("vcard#hasEmail", {
      type: 'Email',
      description: "A person's email",
    });
  },
});
