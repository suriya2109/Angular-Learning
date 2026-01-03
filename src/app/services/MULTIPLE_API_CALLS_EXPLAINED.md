# Handling Multiple API Calls in Angular

This file explains common patterns to handle multiple HTTP calls in Angular using RxJS and the provided `MultipleCallsService`.

1) Parallel independent requests (use `forkJoin`)

- Use when requests are independent and you need all results before proceeding.
- Example: `forkJoin([api.get(url1), api.get(url2)])` — completes when both finish.

2) Get latest values from multiple sources (`combineLatest`)

- Emits whenever any source emits, yielding the most recent values of each.
- Not commonly used for single-shot HTTP calls, better for streams like websockets or form value changes.

3) Chaining dependent requests (`mergeMap` / `concatMap`)

- Use when a second request depends on the first's result.
- `mergeMap` runs children in parallel, `concatMap` runs them sequentially.

4) Choosing between Observables and Promises

- Prefer Observables (`subscribe`, `pipe`) for composition with RxJS operators.
- For simple `async/await` flows you can convert with `firstValueFrom()`.

Example usage (component):

```ts
// Parallel (wait for all)
this.multipleCallsService.getMultipleWithForkJoin(url1, url2)
  .subscribe(([res1, res2]) => {
    // use res1 and res2
  });

// Chained
this.multipleCallsService.chainCallsExample(urlA, res => `details/${res.id}`)
  .subscribe(details => console.log(details));
```

This project includes a `MultipleCallsService` that wraps these patterns. Use the `ApiService` for low-level HTTP methods (get/post/put/patch/delete/head/options/request) so your components stay thin and focused on UI logic.
