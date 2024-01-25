import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  ENDPOINT = 'http://localhost:3000/students';
  getAllStudents() {
    return this.http.get(this.ENDPOINT);
  }
  getAllStudentByID(id: any) {
    return this.http.get(this.ENDPOINT + '/' + id);
  }
  addNewStudent(std: any) {
    return this.http.post(this.ENDPOINT, std).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }
  updateStudent(id: any, newStd: any) {
    this.http.put(this.ENDPOINT + '/' + id, newStd).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  }
  deleteStudent(id: any) {
    this.http.delete(`${this.ENDPOINT}/${id}`).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  }
}
