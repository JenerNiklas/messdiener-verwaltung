import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from '../person.model';
import { MessagesService } from './messages.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessdienerService {
  private messdienerUrl = environment.apiUrl + 'messdiener';

  constructor(private messageService: MessagesService, private http: HttpClient) { }

  getAllMessdiener(): Observable<Person[]> {
    return this.http.get<Person[]>(this.messdienerUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Person[]>("getMessdiener", []))
    );
  }

  getMessdiener(id: number): Observable<Person> {
    const url = this.messdienerUrl + "/" + id;
    return  this.http.get<Person>(url).pipe(
      tap(_ => this.log("fetched messdiener ${this.id}")),
      catchError(this.handleError<Person>("getMessdiener ${id}"))
    );
  }

  update(messdiener: Person | undefined): Observable<any> | undefined {
    if(messdiener)
    {
      const url = this.messdienerUrl + "/" + messdiener.iid;
      return this.http.put<Person>(url, messdiener).pipe(
        tap(_ => this.log("updated messdiener ${this.id}")),
        catchError(this.handleError<Person>("update ${id}"))
      );
    }
    
    return undefined;
  }

  private handleError<T>(operation = "operation", result?: T)
  {
    return (error:any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MessdienerService: ${message}`);
  }
}
