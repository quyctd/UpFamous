import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'items';
  }

  getHomeThumbnail(): Observable<any> {
    return this.http.get(this.baseUrl + '/homepage', {headers: this.httpHeaders});
  }

  getEndlessItem(): Observable<any> {
    return this.http.get(this.baseUrl + '/all', {headers: this.httpHeaders});
  }

  getFollowingItem(id): Observable<any> {
    const body = {user_id: id};
    return this.http.post(this.baseUrl + '/following', body, { headers: this.httpHeaders });
  }

  getPhotoInfo(id): Observable<any> {
    return this.http.get(this.baseUrl + '/show/' + id, { headers: this.httpHeaders });
  }

  likePhoto(itemId, userId): Observable<any> {
    const body = {item_id: itemId, user_id: userId};
    return this.http.post(this.baseUrl + '/like', body, { headers: this.httpHeaders });
  }

  search(query): Observable<any> {
    return this.http.get(this.baseUrl + '/search/' + query, { headers: this.httpHeaders });
  }
}
