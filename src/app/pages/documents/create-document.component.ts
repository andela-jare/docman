import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DocumentService } from '../../services/document.service';

declare const $: any;

@Component({
  selector: 'app-create-document',
  templateUrl: 'create-document.component.html'
})
export class CreateDocumentComponent {
  form: FormGroup;
  @Output() onDocument = new EventEmitter<object>();

  constructor(private fb: FormBuilder, private documentService: DocumentService, private router: Router) {
    // initilize form data
    this.form = fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      access: ['public']
    });
  }

  createDocument(body) {
    this.documentService.createDocument(body)
      .subscribe(
        (value) => {
          // unpopulate the form data
          this.form = this.fb.group({
            title: [null, Validators.required],
            content: [null, Validators.required],
            access: ['public']
          });
          // emit new document to the parent component(dashboard)
          this.onDocument.emit(value);
          $('#myModalNorm').modal('hide');
          this.router.navigate(['dashboard']);
        },
        error => console.log(error)
      );
  }
}
