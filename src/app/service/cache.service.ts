import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileModel } from '../model/file-model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, FileModel[]> = new Map();
  private prefixSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<FileModel[]>([]);

  constructor(private dataService: DataService) {
    this.updateData();
  }

  public updatePrefix(prefix: string) {
    this.prefixSubject.next(prefix);
  }

  public clearCache() {
    this.cache.clear();
  }

  private updateData() {
    this.prefixSubject.subscribe( (prefix: string) => {
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
        data$.subscribe( (data: any) => {
          this.cache.set(prefix, data);
          this.dataSubject.next(data);
        });
      }
    } else {
      this.dataService.getDataFromServer().subscribe( (data: FileModel[]) => this.dataSubject.next(data) );
    }
  }
}
