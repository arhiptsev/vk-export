import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../models/user-data';
import { VkProfile } from '../types/vk-profile';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private _vkProfile = new BehaviorSubject<VkProfile | null>(null);
  public get vkProfile() { return this._vkProfile.asObservable(); }

  public registration(data: UserData): Observable<HttpResponse<void>> {
    return this.http.post<any>('api/user/registration/', data, { observe: 'response' });
  }

  public getProfile(): Observable<any> {
    return this.http.get<any>('api/user/profile');
  }

  public getVkProfile(): Observable<VkProfile> {
    return this.http.get<VkProfile>('api/profile/info');
  }

  public vkLogin(username: string, password: string, code: string = null): Observable<any> {
    return this.http.post(`api/export/login`, {
      username,
      password,
      code
    });
  }

  public vkLogout(): Observable<any> {
    return this.http.post('api/export/logout', {})
      .pipe(tap(() => this._vkProfile.next(null)));
  }

}
