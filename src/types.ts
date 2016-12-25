import { Stream, Source } from 'most';

export interface History extends Stream<Location> {}
export interface HistorySource {
  push(path: Path, state?: State): Location;
  replace(path: Path, state?: State): Location;
  go(amount: number): Location;

  getCurrentLocation(): Location;
}

export interface Location {
  path: Path;
  hash: Hash;
  state: State;
  queries: Queries;
}

export type Path = string;
export type Hash = string;
export type State = any;
export type Queries = any;
