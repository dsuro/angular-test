import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<UserModel[]>(`${environment.BASE_SERVICE_URL}/users`);
  }

  getById(id: number) {
      return this.http.get(`${environment.BASE_SERVICE_URL}/users/${id}`);
  }

  register(user: UserModel) {
      return this.http.post(`${environment.BASE_SERVICE_URL}/users/register`, user);
  }

  update(user: UserModel) {
      return this.http.put(`${environment.BASE_SERVICE_URL}/users/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.BASE_SERVICE_URL}/users/${id}`);
  }
}
