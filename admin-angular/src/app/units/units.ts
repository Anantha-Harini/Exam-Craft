import { Component, inject, OnInit, signal } from '@angular/core';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-units',
  imports: [],
  templateUrl: './units.html',
  styleUrl: './units.css',
})
export class Units implements OnInit{
  addMessage=signal('');
  delMessage=signal('');
  data=inject(Dataservice);
  selectedSubject=signal('');
  oldUnit=signal('');
  editing=signal(false);
  ngOnInit(): void {
    this.data.getfromDB();
  }
  addUnit(subjectName: string, unitName: string) {
    if(subjectName !=='' && unitName.trim() !== '')
    {
      this.data.addUnit(subjectName,unitName);
      this.addMessage.set('Unit added successfully!');
      setTimeout(() => {
        this.addMessage.set('');
      }, 3000);
    }
  }
  deleteUnit(subjectName: string, unitName: string) {
   this.data.deleteUnit(subjectName,unitName);
    this.delMessage.set('Unit deleted successfully!');
      setTimeout(() => {
        this.delMessage.set('');
      }, 3000);

  }
  editUnit(subjectName: string, oldUnitName: string, newUnitName: string) {
    this.data.editUnit(subjectName,oldUnitName,newUnitName);
    this.addMessage.set('Unit edited successfully!');
    setTimeout(() => {
            this.addMessage.set('');
    }, 3000);
    this.editing.set(false);
    this.oldUnit.set('');
  }
  getUnit(subjectName:string)
  {
    for(let subject of this.data.subjects()){
      if(subject.name === subjectName){
        return subject.units;
      }
    }
    return [];
  }
  
}
