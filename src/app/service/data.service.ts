import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileModel } from '../model/file-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getDataFromServer(prefix?: string): Observable<FileModel[]> {
    const url = `${this.apiUrl}/files` + (prefix ? `?q=${prefix}` : '');
    return this.httpClient.get<FileModel[]>(url);
  }
}
