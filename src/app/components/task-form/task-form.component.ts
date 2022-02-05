import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  id: any;
  title: string = 'Add';

  taskForm = this.fb.group({
    id: [null],
    description: ['', Validators.required],
    isdone: [false, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.title = 'Edit';
      this._taskService
        .getById(this.id)
        .subscribe((result) => {
            this.taskForm.patchValue(result.body as Task);     
        });
    }
  }

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

  handleResponse(result: any) {
    if(result.status == 200 || result.status == 201) {
      this.toastService.show('Save successfull!', {classname: 'ngb-toasts bg-success text-light', delay: 5000 })
    }
    if(result.status == 409) {
      this.toastService.show(result.error.message, {classname: 'ngb-toasts bg-danger text-light', delay: 5000 })
    }
    if(result.status == 500) {
      this.toastService.show(result.error.message, {classname: 'ngb-toasts bg-danger text-light', delay: 5000 })
    }
    if(result.status == 204) {
      this.toastService.show('Update successfull', {classname: 'ngb-toasts bg-success text-light', delay: 5000 })
    }
  }

  

  onSubmit() {
    const task = this.taskForm.value as Task;
    if (this.taskForm.valid) {
      if (!this.id) {
        this._taskService.saveTask(task).subscribe({
          next: (result) => this.handleResponse(result),
          error: (error) => this.handleResponse(error)
        });
      } else {
        this._taskService.updateTask(this.id, task).subscribe({
          next: (result) => this.handleResponse(result),
          error: (error) => this.handleResponse(error)
        });
      }
    }
  }
}
