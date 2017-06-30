import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

declare const $: any;

@Component({
  templateUrl: 'document-details.component.html',
  styleUrls: ['document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  documentId;
  document;
  userDetails;
  userId;
  deleteMethod: Function;

  constructor(
    private documentService: DocumentService,
    private userService: UserService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.documentId = +this.route.snapshot.params['id'];
    this.getDocument(this.documentId);
    this.auth.useJwtHelper();
    this.userId = this.auth.userId;
    this.deleteMethod = this.deleteDocument.bind(this);
  }

  getDocument(id) {
    this.documentService.getDocument(id)
      .subscribe(
        value => {
          console.log(value);
          this.document = value.document;
          this.getUser(this.document.ownerId);
        },
        error => {
          console.log(error);
          this.router.navigate(['dashboard']);
        }
      );
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe(
        value => {
          this.userDetails = value;
          console.log(value);
        },
        error => console.log(error)
      );
  }

  deleteDocument() {
    this.documentService.deleteDocument(this.documentId)
      .subscribe(
        result => {
          console.log(result);
          $('#myModal').modal('hide');
          this.router.navigate(['dashboard']);
        },
        error => console.log(error)
      );
  }

  onEditedDocument(data) {
    console.log(data);
    this.document = data;
  }
}
