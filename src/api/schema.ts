import { join } from "path";
import { useMutation, useQuery } from "react-query";
import { graphql } from "graphql";
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
    queryFn: () =>
      graphql({
        schema: schema,
        source: query,
        variableValues: args,
      }),
    config: { staleTime: "Infinity" },
  }) as { data: { data: any; errors: any[] } };
  return {
    ...queryResult,
    data: queryResult.data?.data,
    error: queryResult.data?.errors && queryResult.data?.errors[0],
  };
};

export const useGqlMutation = (
  query: string,
  callbacks?: {
    onSuccess: (data: any) => void;
    onError: (error: any) => void;
  }
) => {
  const { onError, onSuccess } = callbacks ?? {};
  const mutation = useMutation<any, unknown, any, any>(
    ({ variables }) => {
      const result = graphql({
        schema: schema,
        source: query,
        variableValues: variables,
      });
      return result;
    },
    { onSuccess, onError }
  );
  return mutation;
};
