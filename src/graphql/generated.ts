import { useQuery, UseQueryOptions } from 'react-query';
import { fetchGraphQL } from '../app/api/api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Bettable = {
  __typename?: 'Bettable';
  gameKey: Scalars['String'];
  gameTime: Scalars['DateTime'];
  id: Scalars['Int'];
  off: Scalars['Boolean'];
  ouoff: Scalars['Boolean'];
  overunder?: Maybe<Scalars['String']>;
  sideId1: Scalars['String'];
  sideId2: Scalars['String'];
  sport: Scalars['String'];
  team1: Scalars['String'];
  team1Moneyline?: Maybe<Scalars['String']>;
  team1Spread?: Maybe<Scalars['String']>;
  team2: Scalars['String'];
  team2Moneyline?: Maybe<Scalars['String']>;
  team2Spread?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  bettables: Array<Bettable>;
};


export type QueryBettablesArgs = {
  sport: Scalars['String'];
};

export type GetBettablesQueryVariables = Exact<{
  sport: Scalars['String'];
}>;


export type GetBettablesQuery = { __typename?: 'Query', bettables: Array<{ __typename?: 'Bettable', id: number, sport: string, gameKey: string, gameTime: any, team1: string, team2: string, sideId1: string, sideId2: string, team1Spread?: string | null, team2Spread?: string | null, team1Moneyline?: string | null, team2Moneyline?: string | null, overunder?: string | null, ouoff: boolean, off: boolean }> };


export const GetBettablesDocument = `
    query getBettables($sport: String!) {
  bettables(sport: $sport) {
    id
    sport
    gameKey
    gameTime
    team1
    team2
    sideId1
    sideId2
    team1Spread
    team2Spread
    team1Moneyline
    team2Moneyline
    overunder
    ouoff
    off
  }
}
    `;
export const useGetBettablesQuery = <
      TData = GetBettablesQuery,
      TError = unknown
    >(
      variables: GetBettablesQueryVariables,
      options?: UseQueryOptions<GetBettablesQuery, TError, TData>
    ) =>
    useQuery<GetBettablesQuery, TError, TData>(
      ['getBettables', variables],
      fetchGraphQL<GetBettablesQuery, GetBettablesQueryVariables>(GetBettablesDocument, variables),
      options
    );