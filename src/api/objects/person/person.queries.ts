import { arg, extendType } from "webql-nexus-schema";
import { Graphs } from "webql-client";

export const PersonQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("person", {
      type: "Person",
      args: { webId: arg({ type: "String", required: true }) },
      resolve: async (_, { webId }) => {
        const graph = new Graphs(webId);
        const profile = await graph.load();
        return profile["#me"];
      },
    });
  },
});
