import { arg, extendType, inputObjectType } from "webql-nexus-schema";
import { Graphs } from "webql-client";

export const UpdatePersonInput = inputObjectType({
  name: "UpdatePersonInput",
  definition(t) {
    t.string("name");
    t.string("email");
    t.string("role");
  },
});

export const PersonMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePerson", {
      type: "Person",
      args: {
        data: arg({ type: "UpdatePersonInput", required: true }),
        webId: arg({ type: "String", required: true }),
      },
      resolve: async (_, { data, webId }) => {
        console.log(data, webId)
        const graph = new Graphs(webId);
        const { name, email, role } = data;
        const profile = await graph.patch({
          [webId]: {
            "foaf#name": name,
            "vcard#role": role,
            "vcard#hasEmail": { "vcard#value": email },
          },
        });
        return profile["#me"];
      },
    });
  },
});
