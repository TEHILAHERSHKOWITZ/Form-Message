import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/module/Message ';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
@Input() message!:Message
@Output() saveMaessage=new EventEmitter<any>;
@Output() addMessage = new EventEmitter<Message>
EmployeeForm!:FormGroup
Title: any;
title:string="New Message"
ngOnChanges(){
 
  if(this.message!=null){
    this.title="Edit Message"+" "+this.message.id
    this.EmployeeForm.setValue({
     title:this.message.title,
      body:this.message.body
    })
  }
}
constructor(){
  this.EmployeeForm=new FormGroup({
    title:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(40)]),
    body:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(300)]),
  })
}  

Save(event:any) {
  if (this.EmployeeForm.valid) {
    this.saveMaessage.emit(this.EmployeeForm.value as Message)
    this.EmployeeForm.reset();
  }
  else {
    // אם הטופס לא תקין, נסמן את כל השדות כנוגעים
    Object.keys(this.EmployeeForm.controls).forEach((key) => {
      this.EmployeeForm.controls[key].markAsTouched();
    });
  }
}

}
