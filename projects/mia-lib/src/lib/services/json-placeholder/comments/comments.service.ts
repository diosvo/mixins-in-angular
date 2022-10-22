import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { environment } from '@env/environment';
import { Comment } from '@lib/models/json-placeholder/comment.model';
import { BaseService } from '@lib/services/base/base.service';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { Observable } from 'rxjs';

const API_ENDPOINT = environment.jsonPlaceHolderUrl + 'comments/';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends BaseService<Comment> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: ErrorHandlerService,
  ) {
    super(http, handle);
  }

  filtered(params: Params): Observable<Comment[]> {
    return this.list(API_ENDPOINT, params);
  }
}
