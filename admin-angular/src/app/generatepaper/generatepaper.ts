import { Component, inject, signal ,OnInit} from '@angular/core';
import { Dataservice } from '../dataservice';
import { quesdets } from '../../types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generatepaper',
  imports: [],
  templateUrl: './generatepaper.html',
  styleUrl: './generatepaper.css',
})
export class Generatepaper implements OnInit{
  generationMessage = signal('');
  selectedSubject=signal('');
  data=inject(Dataservice);
  subjects=this.data.subjects;
  generatedPaper=signal<quesdets[]>([]);
  paperId=signal('')
  http=inject(HttpClient);
  difficultyPattern:any = {
  Easy:   {easy:0.7, medium:0.2, hard:0.1},
  Medium: {easy:0.4, medium:0.4, hard:0.2},
  Hard:   {easy:0.2, medium:0.3, hard:0.5}
};
  ngOnInit(){
    this.data.getfromDB();
  }
 generatePaper(subject:string, options:any, difficulty:string, examtype:string){

  const units = Array.from(options.selectedOptions).map((o:any)=>o.value);
  if(subject=='' || difficulty=='' || examtype=='' || units.length===0){
    this.generationMessage.set('Please select all options');
    setTimeout(()=>this.generationMessage.set(''),3000);
    return;
  }
  const payload = { subject, units, difficulty, examtype };
  this.data.generatePaperFromAPI(payload).subscribe((data:any)=>{
    if(data.message && !data.qn){
      this.generationMessage.set(data.message);
      this.generatedPaper.set([]); // clear preview
      setTimeout(()=>this.generationMessage.set(''),3000);
      return;
    }
    console.log(data.qn)
    this.paperId.set(data.id);
    this.generatedPaper.set(data.qn); 
    this.generationMessage.set('Question paper generated successfully!');
    setTimeout(()=>this.generationMessage.set(''),3000);

  });

}
  
  getUnits(subjectName:string)
  {
    for(let subject of this.data.subjects()){
      if(subject.name === subjectName){
        return subject.units;
      }
    }
    return [];
  }
  
  downloadPaperById(){
  this.data.downloadPaperById(this.paperId()).subscribe((blob:any)=>{
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QuestionPaper.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  });

}
}
