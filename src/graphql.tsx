import gql from 'graphql-tag';
import * as WebQLClient from 'webql-hooks';
import React from 'react';
import { WebQLClient as Client } from 'webql-hooks';
import { schema } from './api/schema';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export const webQLClient = new Client(schema);
export const ClientProvider: React.FC = ({ children }) => (
      <WebQLClient.ClientProvider client={webQLClient.queryClient}>
        {children}
      </WebQLClient.ClientProvider>
    );
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Email = {
  __typename?: 'Email';
  id?: Maybe<Scalars['ID']>;
  /** An emails type */
  'rdf#type'?: Maybe<Scalars['String']>;
  /** A email's value */
  'vcard#value'?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updatePerson?: Maybe<Person>;
};


export type MutationUpdatePersonArgs = {
  data: UpdatePersonInput;
  webId: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  /** A person's name */
  'foaf#name'?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** A person's email */
  'vcard#hasEmail'?: Maybe<Email>;
  /** A person's occupation */
  'vcard#role'?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  person?: Maybe<Person>;
};


export type QueryPersonArgs = {
  webId: Scalars['String'];
};

export type UpdatePersonInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type GetPersonQueryVariables = Exact<{
  webId: Scalars['String'];
}>;


export type GetPersonQuery = (
  { __typename?: 'Query' }
  & { person?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { name: Person['foaf#name'], role: Person['vcard#role'] }
    & { hasEmail?: Maybe<(
      { __typename?: 'Email' }
      & { value: Email['vcard#value'] }
    )> }
  )> }
);


export const GetPersonDocument = gql`
    query getPerson($webId: String!) {
  person(webId: $webId) {
    id
    name: foaf#name
    role: vcard#role
    hasEmail: vcard#hasEmail {
      value: vcard#value
    }
  }
}
    `;

/**
 * __useGetPersonQuery__
 *
 * To run a query within a React component, call `useGetPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonQuery({
 *   variables: {
 *      webId: // value for 'webId'
 *   },
 * });
 */
export function useGetPersonQuery(baseOptions?: WebQLClient.QueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
        return webQLClient.useQuery<GetPersonQueryVariables, GetPersonQuery>(GetPersonDocument, baseOptions);
      }
export type GetPersonQueryHookResult = ReturnType<typeof useGetPersonQuery>;
export type GetPersonQueryResult = WebQLClient.QueryResult<GetPersonQuery>;