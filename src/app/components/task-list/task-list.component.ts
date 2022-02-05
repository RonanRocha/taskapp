import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public searchText: string = '';
  public taskList: Task[] = [];
  closeResult = '';

  constructor(private _tasKService: TaskService, private modalService: NgbModal, public toastService: ToastService) {}

  ngOnInit(): void {
    this._tasKService.getTasks().subscribe((response) => (this.taskList = response.body as Task[]));
  }

  search($event: any) {
    this.searchText = $event;
  }

  handleResponse(result: any, id = null) {

    console.log(result);

    if(result.status == 200 || result.status == 201) {
      this.toastService.show('Salvo com sucesso!', {classname: 'ngb-toasts bg-success text-light', delay: 5000 })
    }
    if(result.status == 409) {
      this.toastService.show(result.error.message, {classname: 'ngb-toasts bg-danger text-light', delay: 5000 })
    }
    if(result.status == 500) {
      this.toastService.show(result.error.message, {classname: 'ngb-toasts bg-danger text-light', delay: 5000 })
    }
    if(result.status == 204){
      this.toastService.show('Removido com sucesso!', {classname: 'ngb-toasts bg-success text-light', delay: 5000 })
      if(id){
        this.taskList  =
        this.taskList.filter(item => item.id != id);
      }
    }
  }


  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

  onDelete(content:any, id: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
      if(result.confirm) {
        this._tasKService.removeTask(id).subscribe({
          next: (result) =>  this.handleResponse(result,id),
          error: (result) => this.handleResponse(result),
        })
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
