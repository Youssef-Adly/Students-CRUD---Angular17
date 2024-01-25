import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [HttpService],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private http: HttpService,
    private ActivatedRoute: ActivatedRoute
  ) {}
  student: any;
  id: any;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (data) => {
        // console.log('id = ' ,data);
        this.id = data['id'];
      },
      error: (err) => console.log(err),
    });
    //////////////////////////////////////
    this.http.getAllStudentByID(this.id).subscribe({
      next: (data) => {
        // console.log('Student With id ',this.id,data);
        this.student = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
