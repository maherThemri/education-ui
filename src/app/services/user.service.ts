import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient
  ) { }

  addUser(obj: User): Observable<User> {
    console.log("here obj user in the service", obj);


    return this.http.post<User>(`${this.apiURL}/add-user`, obj);
  }
  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiURL}/`);
  }
  findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/get-user/${id}`);
  }
  validateUser(id: number): Observable<number> {
    console.log("here service user 'id-user': ", id);

    return this.http.patch<number>(`${this.apiURL}/validate/${id}`, {});
  }

  invalidateUser(id: number): Observable<number> {
    console.log("here service user 'id-user': ", id);

    return this.http.patch<number>(`${this.apiURL}/invalidate/${id}`, {});
  }

  uploadImageFS(file: File, filename: string, idUser: number): Observable<any> {
    console.log("here file", file);
    console.log("here fileName", filename);
    console.log("here id user", idUser);

    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idUser}`;
    return this.http.post(url, imageFormData);
  }

}
