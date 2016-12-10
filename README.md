# prehistoric

> Manage the history API cross-platform

## What is it?

Its a small abstraction for dealing with the History API in both browsers and
on the server, built on top of [most.js](https://github.com/cujojs/most).

## Let me have it!
```sh
npm install --save prehistoric
```

## API

Get ready to learn a whole wopping 1 function!

#### `createHistory()`

I could go super in depth about this but lets just look at some code!

```typescript
const { push, replace, go, history } = createHistory();

history.observe(console.log) // history is a stream!

push('/', { some: 'state' }) // similar to history.pushState, but state is optional

replace('/', { some: 'new_state' }) // similar to history.replaceState, state also optional

go(-1) // exactly like history.go!
```

**`push(path: string, state?: any)`**

Create a new location in the history stack.

**`replace(path: string, state?: any)`**

Replace the current location in the history stack.

**`go(amount: number)`**

Go forwards (positive integers) or backwards (negative integers) through the history stack.

**`history :: Stream<Location>`**

A stream of location objects.

```typescript
interface Location {
 path: string, // current path
 hash: string, // current hash
 state: any, // associated state object
 queries: any, // query strings parsed into an object
}
```
