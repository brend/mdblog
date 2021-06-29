import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../model/content';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  @Input() public post?: Post;

  public postContent: Content | undefined;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.selectedPost.subscribe(async post => {
      this.post = post;
      this.postContent = post ? await this.postsService.post(post.id) : undefined;
    });
  }

}
