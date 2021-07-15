import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  @ViewChild('templateForm') templateForm!: NgForm;

  createError?: string;

  constructor(private router:  Router, private posts: PostsService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const post = this.templateForm.value;

    this.createError = undefined;
    
    try {
      const postId = await this.posts.create(post.title, post.contents);

      console.log('postId', postId);

      if (postId) {
        this.router.navigate(['/', 'post', postId])
      }
    } catch(error) {
      this.createError = "The post could not be created: " + error.message;
    }
  }

}
