import { Sink, Scheduler } from 'most';
import { HistorySource, Location, Queries, State, Path } from './types';

export class BrowserSource implements HistorySource {
  public push(path: Path, state: State = {}) {
    window.history.pushState(state, createKey(), path);
    return getCurrentLocation();
  }

  public replace(path: Path, state: State = {}) {
    window.history.replaceState(state, createKey(), path);
    return getCurrentLocation();
  }

  public go(amount: number) {
    if (amount !== 0)
      window.history.go(amount);

    return getCurrentLocation();
  }

  public getCurrentLocation() {
    return getCurrentLocation();
  }
}

function getCurrentLocation() {
  return {
    path: location.pathname,
    state: history.state,
    hash: location.hash,
    queries: parseQueryString(location.search),
  };
}

function createKey() {
  return Math.random().toString(36).substr(2, 6);
}

function parseQueryString(queryString: string): Queries {
  const queryStrings = queryString.substring(1).split('&');

  return queryStrings
    .reduce(function (queries: Queries, query: string) {
      const [queryName, queryValue] = query.split('=');

      queries[queryName] = queryValue;

      return queries;
    }, {});
}
