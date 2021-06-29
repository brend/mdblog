import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Content } from '../model/content';
import { Post } from '../model/post';

// TODO: make this globally available and such
const API_PATH = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public selectedPost = new Subject<Post | undefined>();

  public selectPost(post: Post | undefined) {
    this.selectedPost.next(post);
  }

  public async posts():  Promise<Post[]> {
    return this.http.get<Post[]>(`${API_PATH}/post`).toPromise();
  }

  public async post(postId: string): Promise<Content> {
    return this.http.get<Content>(`${API_PATH}/post/${postId}`).toPromise();
  }
}
