import { Sink, Scheduler, PropagateTask } from 'most';
import { HistorySource, Location, Path, State } from './types';

const initialLocation: Location =
  {
    path: '/',
    hash: '',
    state: {},
    queries: {},
  };

export class ServerSource implements HistorySource {
  private locations: Array<Location> = [initialLocation];
  private position: number = 0;

  public push(path: Path, state: State = {}) {
    ++this.position;

    const location = createLocation(path, state);

    this.locations[this.position] = location;

    return location;
  }

  public replace(path: Path, state: State = {}) {
    const location = createLocation(path, state);

    this.locations[this.position] = location;

    return location;
  }

  public go(amount: number) {
    const count = this.locations.length;
    const position = this.position;

    const newPosition = position + amount;

    if (newPosition >= count)
      this.position = count - 1;
    else if (newPosition < 0)
      this.position = 0;
    else
      this.position = newPosition;

    return this.locations[this.position];
  }

  public getCurrentLocation(): Location {
    return this.locations[this.position];
  }
}

function createLocation(path: Path, state: State) {
  return {
    path,
    state,
    hash: '',
    queries: {},
  };
}
