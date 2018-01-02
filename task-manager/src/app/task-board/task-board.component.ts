import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { User } from '../_models/user';
import { Task } from '../_models/task';
import { forEach } from '@angular/router/src/utils/collection';

import { AuthenticationServiceService } from '../_service/authentication-service.service';
import { element } from 'protractor';

const usersList: User[] = [{
  id: 'one',
  name: 'Andrew',
  password: 'symonds'
},
{
  id: 'two',
  name: 'Jack',
  password: 'kallis'
},
{
  id: 'three',
  name: 'Steve',
  password: 'smith'
}]

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  providers: [AuthenticationServiceService]
})
export class TaskBoardComponent implements OnInit {
  currentUser = usersList[1]; //to be fetched from localStorage
  allUsers: User[] = usersList;
  tasks: Task[] = [];
  newTask: Task;
  myOptions: IMultiSelectOption[];
  taskName: string;
  taggedModel: any[];
  status: string;


  constructor(private authService: AuthenticationServiceService) {
    this.myOptions = this.allUsers;
  }

  ngOnInit() {
    this.authService.getTasksList()
      .subscribe((data) => {
        console.log(data);
        this.tasks = data.filter(element => {
          return (element.createdBy === this.currentUser.name)||(element.taggedList.indexOf(this.currentUser.id)>-1);
        });
      });
  }

  addTask() {
    if (this.taggedModel) {
      let selectedUsers = [];

      this.taggedModel.forEach(element => {
        var filtered = this.allUsers.filter(event => {
          return event.id === element;
        });
        console.log('filtered  --- ' + typeof filtered[0].id);
        selectedUsers.push(filtered[0].id);
      });

      this.newTask = {
        name: this.taskName,
        taggedList: selectedUsers,
        createdBy: this.currentUser.name,
        status: this.status
      }
    }

    this.authService.addNewTask(this.newTask)
      .subscribe((data) => {
        console.log("Task added message:" + data.message);
        this.ngOnInit();
      });
  }

  onChange(event) {
    //console.log(this.taggedModel);
    console.log(event);
  }
}
