import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  async ngOnInit() {
    this.posts = await this.postsService.posts();
  }

  public selectPost(post: Post) {
    this.postsService.selectPost(post);
  }

}
