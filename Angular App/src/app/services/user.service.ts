import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.usersUrl +"/"+ userId);
  }

  public addUser(user: User) {
    return this.http.post<User>(this.usersUrl + "/add", user);
  }

  public updateUser(user: User) {
    return this.http.put<User>(this.usersUrl + "/update", user);
  }

  public deleteUser(userId: number) {
    return this.http.delete<User>(this.usersUrl + "/delete/"+ userId);
  }
}
