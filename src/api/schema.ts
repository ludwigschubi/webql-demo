import { join } from "path";
import { useQuery } from "react-query";
import { graphql } from "webql-js";
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

export const useGqlQuery = (
  query: string,
  args?: { [key: string]: any },
  dataKey?: string
) => {
  const queryResult = useQuery({
    queryKey: dataKey,
    queryFn: () => {
      const result = graphql({
        schema: schema,
        source: query,
        variableValues: args,
      });
      return result;
    },
    config: { staleTime: "Infinity" },
  }) as { data: { data: any; errors: any[] } };
  return {
    ...queryResult,
    data: queryResult.data?.data,
    error: queryResult.data?.errors && queryResult.data?.errors[0],
  };
};
