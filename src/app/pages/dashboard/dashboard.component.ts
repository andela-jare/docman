import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { DocumentService } from '../../services/document.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  documents: any[] = null;
  documentsSub;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.getDocuments();
  }

  ngOnDestroy() {
    this.documentsSub.unsubscribe();
  }

  /**
   * get all documents from the server
   */
  getDocuments() {
    this.documentsSub = this.documentService.getDocuments()
      .subscribe(
        value => {
          this.documents = value.documents;
          console.log(value);
        },
        error => console.log(error)
      );
  }

  /**
   * gets the new document being created
   *
   * @param {Event} value - new document
   */
  newDocument(value) {
    this.documents.unshift(value.document);
  }

  formatTime(time) {
    return moment(time, 'YYYY-MM-DD hh:mm:ss').fromNow();
  }

  truncateContent(content) {
    if (content.length > 100) {
      return `${content.substring(0, 100)}...`;
    }
    return content;
  }
}
