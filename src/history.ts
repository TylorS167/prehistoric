import { Stream, Sink, never, defaultScheduler, PropagateTask } from 'most';
import { HoldSubjectSource } from 'most-subject';
import { History, HistorySource, Location, Path, State } from './types';
import { BrowserSource } from './BrowserSource';
import { ServerSource } from './ServerSource';

export function createHistory() {
  const holdSource = new HoldSubjectSource(never().source, 1);

  const historySource: HistorySource =
    inBrowser() ? new BrowserSource() : new ServerSource();

  const history: History =
    new Stream<Location>(holdSource).startWith(historySource.go(0));

  function event(location: Location) {
    defaultScheduler.asap(PropagateTask.event(location, holdSource));
  }

  function push(path: Path, state: State = {}) {
    event(historySource.push(path, state));
  }

  function replace(path: Path, state: State = {}) {
    event(historySource.replace(path, state));
  }

  function go(amount: number) {
    event(historySource.go(amount));
  }

  return { push, replace, go, history };
}

function inBrowser() {
  try {
    return window && window.history;
  } catch (e) {
    return false;
  }
}