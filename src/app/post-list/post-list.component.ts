import { Component, OnInit } from '@angular/core';
import { PostHeader } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: PostHeader[] = [];

  constructor(private postsService: PostsService) {}

  async ngOnInit() {
    this.posts = await this.postsService.posts();
  }

  public selectPost(post: PostHeader) {
    this.postsService.selectPost(post);
  }

}
