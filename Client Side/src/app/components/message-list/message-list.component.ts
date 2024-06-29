import { Component, EventEmitter, Input ,Output} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Message } from 'src/app/module/Message ';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
@Input() message!:Message;
selectedMessage?:Message;
newForm: boolean = false;
messageList:Message[]=[];
date:string=new Date().toLocaleDateString();
textSearch = '';
loadding:boolean=false
constructor(private userService:UserService){

}

ngOnInit() {
  this.userService.getUserList().subscribe({
    next:(res)=>{this.messageList=res,console.log(res)},
    error:(error)=>{alert("o no oopsss....")}
  })
}


addMessage(message: Message) {
  this.loadding=true
  this.userService.insertMessage(message).subscribe({
    next: (res) => {
      console.log('Server response:', res);
      const newMessage: Message = {
        id:message.id,
        userId: message.userId,
        title: message.title,
        body: message.body
      };
      alert("ההודעה נשמרה בהצלחה")

      this.messageList.push(newMessage);
      this.loadding=false
      this.newForm = false;
    },
    error: (error) => {"שמירה נכשלה" }
  
})
};

selectedMessagee(message: Message) {
  this.selectedMessage=message;
  this.newForm=false;
}

addNewMessage(){
this.newForm=true;

}
saveMessage(selectedMessage: Message) {
  if (this.selectedMessage) {
    const index = this.messageList.findIndex(m => m.id === this.selectedMessage!.id);

    if (index !== -1) {
      this.messageList[index] = {
        id: this.selectedMessage.id,
        userId: this.selectedMessage.userId,
        title: selectedMessage.title,
        body: selectedMessage.body
      };
    }
    this.selectedMessage = undefined;
  }
}
messageListSearch(){
  if(this.textSearch.length===0)
  {
    return this.messageList
  }
 
   return this.messageList.filter((a)=>
    a.title.includes(this.textSearch)
    )
}
}


