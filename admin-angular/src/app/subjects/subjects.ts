import { Component, signal,inject ,OnInit} from '@angular/core';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-subjects',
  imports: [],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects implements OnInit{
  addMessage=signal('');
  delMessage=signal('');
  data=inject(Dataservice);
  subjects=this.data.subjects;
  ngOnInit(){
    this.data.getfromDB()
  }
  addSubject(subjectName: string, subjectCode: string) {
    if(subjectName.trim() !== ''){
      this.data.addSubject(subjectName,subjectCode);
      this.addMessage.set('Subject added successfully!');
      setTimeout(() => {
        this.addMessage.set('');
      }, 3000);
    }
  }
  deleteSubject(subjectName: string) {
    this.data.deleteSubject(subjectName);
    this.delMessage.set('Subject deleted successfully!');
    setTimeout(() => {
      this.delMessage.set('');
    }, 3000);
  }
}
