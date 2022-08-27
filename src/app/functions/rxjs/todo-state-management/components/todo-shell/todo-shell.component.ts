import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-shell.component.html',
  styleUrls: ['./todo-shell.component.scss']
})
export class TodoShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
