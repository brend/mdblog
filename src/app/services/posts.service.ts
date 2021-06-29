import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';

// TODO: make this globally available and such
const API_PATH = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public async posts():  Promise<Post[]> {
    return this.http.get<Post[]>(`${API_PATH}/post`).toPromise();
  }
}
