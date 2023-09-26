import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, take, pipe } from 'rxjs';
import { FileModel } from '../model/file-model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, FileModel[]> = new Map();
  private prefixSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<FileModel[]>([]);
  private prefixSubscription: Subscription | undefined;

  constructor(private dataService: DataService) {
    this.onPrefixUpdate();
  }

  public prefixUnsubscribe() {
    if (this.prefixSubscription) {
      this.prefixSubscription.unsubscribe();
    }
  }

  public updatePrefix(prefix: string) {
    this.prefixSubject.next(prefix);
  }

  public clearCache() {
    this.cache.clear();
  }

  private onPrefixUpdate() {
    this.prefixSubscription = this.prefixSubject.subscribe( (prefix: string) => {
      this.initData(prefix);
    });
  }

  getData(): Observable<FileModel[]> {
    return this.dataSubject.asObservable();
  }

  private initData(prefix?: string): void {
    if (prefix) {
      if (this.cache.has(prefix)) {
        const value = this.cache.get(prefix);
        if (value) {
          this.dataSubject.next(value);
        }
      } else {
        const data$ = this.dataService.getDataFromServer(prefix);
        data$.pipe(take(1)).subscribe( (data: any) => {
          this.cache.set(prefix, data);
          this.dataSubject.next(data);
        });
      }
    } else {
      this.dataService.getDataFromServer().pipe(take(1)).subscribe( (data: FileModel[]) => this.dataSubject.next(data) );
    }
  }
}
