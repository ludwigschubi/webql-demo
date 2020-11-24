import { objectType } from "webql-nexus-schema";

export const EmailType = objectType({
  name: "Email",
  definition(t) {
    t.id("id");
    t.string("vcard#value", {
      description: "A email's value",
    });
    t.string("rdf#type", {
      description: "An emails type",
    });
  },
});
