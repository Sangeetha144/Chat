import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { userDetails } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= "http://localhost:3000/userData";
 
  private readonly isLoggedInKey = 'isLoggedIn';

  constructor(
    private http:HttpClient,
  ) { }

  RegisteredUser(data:any)
  {
    return this.http.post(this.url,data)
  }
  getUsers(): Observable<userDetails[]> {
    return this.http.get<userDetails[]>(this.url);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<userDetails[]>(this.url).pipe(
      map((users: userDetails[]) => {
        const user = users.find((u: userDetails) => u.username === username && u.password === password);
        const isLoggedIn = !!user; // Convert user object to boolean

        if (isLoggedIn) {
          sessionStorage.setItem(this.isLoggedInKey, 'true');
          sessionStorage.setItem('loggedInUserId', user.id.toString()); // Store the user's id
        }

        return isLoggedIn;
      }),
    );
  }
  logout(): void {
    sessionStorage.removeItem(this.isLoggedInKey);
 
  
  }


  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.isLoggedInKey) === 'true';
  }

  getLoggedInUserId(): number | null {
    const isLoggedIn = sessionStorage.getItem(this.isLoggedInKey) === 'true';
    if (isLoggedIn) {
      // Assuming you store the "id" as a number in sessionStorage
      const userIdString = sessionStorage.getItem('loggedInUserId');
      return userIdString ? +userIdString : null;
    }
    return null;
  }
 
}