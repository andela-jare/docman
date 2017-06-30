import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DocumentService } from '../../services/document.service';

declare var $;

@Component({
  selector: 'app-edit-document',
  templateUrl: 'edit-document.component.html'
})
export class EditDocumentComponent implements OnInit {
  form: FormGroup;
  @Input() document;
  @Output() editedDocument = new EventEmitter<Object>();

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.document.title, Validators.required],
      content: [this.document.content , Validators.required],
      access: [this.document.access]
    });
  }

  editDocument(data) {
    this.documentService.editDocument(this.document.id, data)
      .then((value) => {
        this.editedDocument.emit(value);
        $('#myModalNorm').modal('hide');
      })
      .catch(error => console.log(error));
  }
}
