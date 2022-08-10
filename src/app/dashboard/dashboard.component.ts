import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ValueFromArray } from 'rxjs';
import studentData from '../student.json';

interface Student {
  id: number;
  name: string;
  cname: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  students: Student[] = studentData;

  id: any;

  getId(id: number) {
    this.id = id;
    console.log(this.id);
  }

  setCertificate(val: any) {
    console.log(val);
    let filterData = this.students.filter((data) => data.id === this.id);
    let count = filterData[0].cname.length + 1;
    console.log(count);
    val['id'] = count;
    filterData[0].cname.push(val);

    console.log(filterData);
    let ref = document.getElementById('close');
    ref?.click();
  }

  deleteCertificate(stud: object) {
    let filterData = this.students.filter((data) => data.id === this.id);
    console.log(filterData);
    console.log(stud);
    filterData[0].cname.splice(filterData[0].cname.indexOf(stud), 1);

    console.log(filterData[0].cname.length);

    if (filterData[0].cname.length == 0) {
      console.log(this.students);

      this.students.splice(
        this.students.findIndex((x) => x.id === this.id),
        1
      );
      let ref = document.getElementById('closedelete');
      ref?.click();
    }
  }

  addNewUser(value: any) {
    let count = this.students.length + 1;
    value['id'] = count;
    console.log(value);

    let data = {
      id: value.id,
      name: value.name,
      cname: [{
        id: 1,
        certification: value.certification,
        status: value.status
      }]
    }
    this.students.push(data)

    console.log(this.students);
    let ref = document.getElementById('closeAddUser');
    ref?.click();
  }

  cid: any;
  getcid(id: any) {
    this.cid = id;
    console.log(this.cid);
  }

  updateStatus(stat: string) {
    let filterData = this.students.filter((data) => data.id === this.id);
    let filterData1 = filterData[0].cname.filter((data) => data.id === this.cid);
    filterData1[0].status = stat;
    console.log(filterData1[0]);
  }

}
