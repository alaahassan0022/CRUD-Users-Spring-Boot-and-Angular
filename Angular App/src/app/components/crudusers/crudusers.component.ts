import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crudusers',
  templateUrl: './crudusers.component.html',
  styleUrls: ['./crudusers.component.css']
})
export class CRUDUsersComponent implements OnInit {
  users: User[]=[];
  user:User=new User();
  
  isAdd:boolean=true;
  isDuplicateUsername:boolean=false;
  isDuplicateEmail:boolean=false;
  // currentUserType:String="";
  // currentSlotIdIfVIP:number|undefined;
  // unBookedSlots: Slot[]=[];
  // slotIdIfVIPString:String=""
  // slotIdIfVIP:number|undefined;
  emailsMap:Map<String,number>=new Map();
  usernamesMap:Map<String,number>=new Map();
  // previousType:String="";
  previousEmail:String="";
  previousUsername:String="";
  // userIdsWithSlotIds:Map<number,number>=new Map();
  // tmpSlots:Slot[]=[];

  constructor(private userService: UserService) { 
    
  }

  ngOnInit(): void {
    
    this.refreshVariables();
    
    // this.slotService.getUnbookedSlots().subscribe(
    //   data => {this.unBookedSlots=data;}
    // )

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      for(let user of this.users){
          this.emailsMap.set(user.email, 1);
          this.usernamesMap.set(user.username,1);
      }
    });
    // this.slotService.getSlots().subscribe(data => {
    //   this.tmpSlots=data;
      
    //   for(let slot of this.tmpSlots)
    //     this.userIdsWithSlotIds.set(slot.userId!,slot.slotId!);
    // });
  }

  addOrUpdateUser(){
    // this.slotIdIfVIP=parseInt(this.slotIdIfVIPString.toString());
    // console.log(this.slotIdIfVIP);
    if (this.isAdd) { // add
      console.log("in if this.isAdd");
      if(this.emailsMap.has(this.user.email)){
        this.isDuplicateEmail=true;
        alert("This email is already taken!");
      }
      if(this.usernamesMap.has(this.user.username)){
        this.isDuplicateUsername=true; 
        alert("This username is already taken!");
      }
      if(!this.isDuplicateEmail&&!this.isDuplicateUsername){
        this.user.userId=undefined;
        
        this.userService.addUser(this.user).subscribe(()=>{
          this.ngOnInit();
        });
      }
    }
    else { // update
      console.log("in else of if this.isAdd");
      // this.user.userType=this.currentUserType;
      if(this.previousEmail!=this.user.email){
        if(this.emailsMap.has(this.user.email)){
          this.isDuplicateEmail=true;
          alert("This email is already taken!");

        }
      }
      if(this.previousUsername!=this.user.username){
        if(this.usernamesMap.has(this.user.username)){
          this.isDuplicateUsername=true;
          alert("This username is already taken!");

        }
      }
      if(!this.isDuplicateEmail && !this.isDuplicateUsername){
        this.userService.updateUser(this.user).subscribe(()=>{
            this.ngOnInit();
        });
      }
    }
  }


  deleteUser(index: number){
    this.userService.deleteUser(this.users[index].userId!).subscribe(()=>{this.ngOnInit();});
  }
  updateUser(index: number){
    this.user=this.users[index];
    this.previousEmail=this.user.email;
    this.previousUsername=this.user.username;
  }
  
  // isVIP():boolean{
  //   // if((this.currentUserType=='VIP' && this.isAdd)||(this.user.userType=='VIP'))
  //   //   return true;
  //   return false;
  // }

  refreshVariables(){
    this.users=[];
    this.user=new User();
    this.isAdd=true;
    this.isDuplicateUsername=false;
    this.isDuplicateEmail=false;
    // this.currentUserType="";
    // this.unBookedSlots=[];
    // this.slotIdIfVIP=undefined;
    // this.currentSlotIdIfVIP=undefined;
    this.emailsMap = new Map();
    this.usernamesMap=new Map();
    // this.previousType="";
    this.previousEmail="";
    this.previousUsername="";
    // this.userIdsWithSlotIds=new Map();
    // this.tmpSlots=[];
  }
}
