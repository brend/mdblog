import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post, PostHeader } from '../model/post';

// TODO: make this globally available and such
const API_PATH = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private _selectedPost = new Subject<Post | undefined>();
  public get selectedPost(): Observable<Post | undefined> {
    return this._selectedPost;
  }

  public selectPost(post: PostHeader | undefined) {
    this.post(post?.id ?? '').then(post => 
      this._selectedPost.next(post)
    );
  }

  public async posts():  Promise<PostHeader[]> {
    return this.http.get<PostHeader[]>(`${API_PATH}/post`).toPromise();
  }

  public async post(postId: string | undefined): Promise<Post | undefined> {
    return postId ? this.http.get<Post>(`${API_PATH}/post/${postId}`).toPromise() : undefined;
  }
}
