import { Injectable } from '@angular/core';
import { forkJoin, Observable, combineLatest, of } from 'rxjs';
import { map, mergeMap, concatMap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MultipleCallsService {
  constructor(private api: ApiService) {}

  // Use forkJoin when you want to run multiple independent HTTP requests in parallel
  // and wait for all of them to complete. Returns an Observable of results array.
  getMultipleWithForkJoin(url1: string, url2: string): Observable<[any, any]> {
    return forkJoin([
      this.api.get<any>(url1),
      this.api.get<any>(url2)
    ]) as Observable<[any, any]>;
  }

  // combineLatest will emit when any source emits, returning the latest values.
  // For HTTP (single-emission) calls it's rarely what you need, but included for completeness.
  getMultipleWithCombineLatest(url1: string, url2: string): Observable<[any, any]> {
    return combineLatest([
      this.api.get<any>(url1),
      this.api.get<any>(url2)
    ]) as Observable<[any, any]>;
  }

  // Example: chain dependent calls where the second depends on the first result
  // Use mergeMap/concatMap depending on concurrency needs.
  chainCallsExample(initialUrl: string, dependentUrlFactory: (res: any) => string) {
    return this.api.get<any>(initialUrl).pipe(
      mergeMap(res => this.api.get<any>(dependentUrlFactory(res)))
    );
  }

  // Example combining results with mapping
  combineAndTransform(url1: string, url2: string) {
    return forkJoin([
      this.api.get<any>(url1),
      this.api.get<any>(url2)
    ]).pipe(
      map(([r1, r2]) => ({ first: r1, second: r2, mergedCount: (r1?.length || 0) + (r2?.length || 0) }))
    );
  }
}
