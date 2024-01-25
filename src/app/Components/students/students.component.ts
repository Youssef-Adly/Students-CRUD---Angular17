import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student/student.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../Services/http.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentComponent, HttpClientModule, RouterModule],
  providers: [HttpService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: any;
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.log(err),
    });
  }
}
