import * as assert from 'assert';
import { createHistory, Location } from '../src';

const jsdom = require('jsdom-global');

const defaultHtml =
  '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

describe('history', function () {
  beforeEach(() => {
    jsdom(defaultHtml, {
      url: 'http://www.example.com',
    });
  });

  it('contains current location', () => {
    return createHistory().history.take(1).observe((location: Location) => {
      assert.strictEqual(location.path, '/');
    });
  });

  describe('push', () => {
    it('propagates a new path and state', () => {
      const { push, history } = createHistory();

      const PATH = '/test';
      const STATE = { hello: 1 };

      setTimeout(() => push(PATH, STATE));

      return history.skip(1).take(1).observe(loc => {
        assert.strictEqual(loc.path, PATH);
        assert.strictEqual(loc.state, STATE);
      });
    });
  });

  describe('replace', () => {
    it('replaces the current path and state', () => {
      const { push, replace, history } = createHistory();

      const firstPath = '/test';
      const firstState = { hello: 1 };

      const secondPath = '/other';
      const secondState = { hello: 2 };

      setTimeout(() => {
        push(firstPath, firstState);
        replace(secondPath, secondState);
      });

      return history.skip(2).take(1).observe(loc => {
        assert.strictEqual(loc.path, secondPath);
        assert.strictEqual(loc.state, secondState);
      });
    });
  });

  describe('go', () => {
    it('allows moving back through previous paths', () => {
      const firstPath = '/';

      const { push, go, history } = createHistory();

      setTimeout(() => {
        push(firstPath);
        push('/other');
        push('/test');

        go(-2);
      });

      return history.skip(4).take(1).observe(loc => {
        assert.strictEqual(loc.path, firstPath);
      });
    });
  });
});
