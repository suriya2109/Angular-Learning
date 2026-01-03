import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'https://dummyjson.com/products';

  // Simple in-memory cache for the product list
  private products$?: Observable<Product[]>;

  constructor(private api: ApiService) {}

  // Get all products with caching
  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.api.get<{ products: Product[] }>(this.base).pipe(
        map(res => res.products || []),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError(() => of([]))
      );
    }
    return this.products$;
  }

  // Get single product
  getProduct(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.base}/${id}`);
  }

  // Search products by title using a term observable (debounced)
  search(term$: Observable<string>): Observable<Product[]> {
    return term$.pipe(
      debounceTime(300),
      switchMap(term => {
        if (!term || term.trim() === '') return this.getProducts();
        return this.api.get<{ products: Product[] }>(`${this.base}/search?q=${encodeURIComponent(term)}`).pipe(
          map(r => r.products || []),
          catchError(() => of([]))
        );
      })
    );
  }

  // Create product (dummy API supports /add)
  addProduct(payload: Partial<Product>) {
    return this.api.post<Product>(`${this.base}/add`, payload).pipe(
      tap(() => this.invalidateCache())
    );
  }

  updateProduct(id: number, payload: Partial<Product>) {
    return this.api.put<Product>(`${this.base}/${id}`, payload).pipe(
      tap(() => this.invalidateCache())
    );
  }

  deleteProduct(id: number) {
    return this.api.delete<any>(`${this.base}/${id}`).pipe(
      tap(() => this.invalidateCache())
    );
  }

  private invalidateCache() {
    this.products$ = undefined;
  }
}
