import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class test {
  title = 'app-test';
  firstname:string='GOOD JOB'

  ChangeName(){
    this.firstname="Change Name to Happy"
  }
}