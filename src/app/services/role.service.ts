import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiURL: string = 'http://localhost:8080/api/roles';
  constructor(
    private http: HttpClient
  ) { }
  addRole(obj: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiURL}/add-role`, obj);
  }

  getAllRoles(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(this.apiURL + "/");
  }
  getAllRolesActive(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${this.apiURL}/roles-active`);
  }
  validateRole(idRole: number) {
    console.log("here id role", idRole);

    return this.http.patch(`${this.apiURL}/validate/${idRole}`, {});
  }

  invalidateRole(idRole: number) {
    return this.http.patch(`${this.apiURL}/invalidate/${idRole}`, {});
  }
  findRoleById(idRole: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiURL}/get-role/${idRole}`)
  }

}
