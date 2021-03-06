import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('templateForm') templateForm!: NgForm;

  post?: Post;

  errorMessage?: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private posts: PostsService,
  ) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const postIdFromRoute = routeParams.get('postId');

    if (postIdFromRoute) {
      this.post = await this.posts.post(postIdFromRoute);

      this.templateForm.setValue({title: this.post?.title, contents: this.post?.text});
    }
  }

  edit() {
    if (this.post) {
      this.router.navigate(['/', 'edit', this.post.id]);
    }
  }

  async onSubmit() {
    if (!this.post) {
      return;
    }

    const post = this.templateForm.value;

    this.errorMessage = undefined;

    try {
      const newPostId = await this.posts.update(this.post.id, post.title, post.contents);

      this.post.id = newPostId;
      this.post.title = post.title;
      this.post.text = post.contents;
      
      this.navigateToPost()
    } catch(error) {
      this.errorMessage = "The post could not be created: " + error.message;
    }
  }

  onCancel() {
    if (this.confirmCancellation()) {
      this.navigateToPost();
    }
  }

  navigateToPost() {
    if (this.post) {
      this.router.navigate(['/', 'post', this.post.id]);
    }
  }

  confirmCancellation(): boolean {
    return confirm('If you leave now, you\'ll lose any changes you made to the post.');
  }

}
