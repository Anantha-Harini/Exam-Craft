import { Component, inject, signal, OnInit } from '@angular/core';
import { Dataservice } from '../dataservice';
import { DatePipe } from '@angular/common';
@Component({
  
  selector: 'app-viewpapers',
  imports:[DatePipe],
  templateUrl: './viewpapers.html',
  styleUrl: './viewpapers.css'
})
export class Viewpapers implements OnInit {

  data = inject(Dataservice);
  papers = signal<any[]>([]);
  
  ngOnInit(){
    this.loadPapers();
    this.data.getfromDB();
  }
  loadPapers(){
    this.data.getPapers().subscribe((res:any)=>{
      this.papers.set(res);
    });
  }
  filterBySubject(subject:string){
    if(subject === ''){
      this.loadPapers(); // show all
      return;
    }
    this.data.getPapersBySubject(subject).subscribe((res:any)=>{
      this.papers.set(res);
    });
  }
  download(id:string){

    this.data.downloadPaperById(id).subscribe((blob:any)=>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QuestionPaper.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    });

  }

}