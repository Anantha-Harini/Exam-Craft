import { Injectable, signal,inject, OnInit } from '@angular/core';
import { quesdets, subjectdets } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Dataservice{
  subjects = signal<subjectdets[]>([]);
  questions=signal<quesdets[]>([]);
  http=inject(HttpClient);
  baseUrl = "https://automated-question-paper-generation.onrender.com/api";
 //SUBJECT API'S CALL
 getfromDB()
  {
      this.http.get<subjectdets[]>(`${this.baseUrl}/listsubject`).subscribe((data)=>{this.subjects.set(data)});
      this.http.get<quesdets[]>(`${this.baseUrl}/listqns`).subscribe((data)=>{this.questions.set(data)});
  }
  addSubject(subjectName:string,subjectCode:string)
  {
      this.http.post<subjectdets[]>(`${this.baseUrl}/addsubject`,{sname:subjectName,scode:subjectCode,units:[]})
      .subscribe((data)=>{this.subjects.set(data)});
  }
  deleteSubject(subjectName:string)
  {
      this.http.delete<subjectdets[]>(`${this.baseUrl}/delsubject/${subjectName}`)
      .subscribe((data)=>{this.subjects.set(data)});
  }

  //UNIT API'S CALL
  addUnit(subjectName:string,unitName:string)
  {
      this.http.post<subjectdets[]>(`${this.baseUrl}/addunit`,{sname:subjectName,uname:unitName})
      .subscribe((data)=>{this.subjects.set(data)});
  }
  deleteUnit(subjectName:string,unitName:string)
  {
      this.http.delete<subjectdets[]>(`${this.baseUrl}/delunit/${subjectName}/${unitName}`)
      .subscribe((data)=>{this.subjects.set(data)});
  }
  editUnit(subjectName:string,oldUnitName:string,newUnitName:string)
  {
    this.http.patch<subjectdets[]>(`${this.baseUrl}/editunit/${subjectName}/${oldUnitName}`,{name:newUnitName})
      .subscribe((data)=>{this.subjects.set(data)});
  }


  //QUESTION API'S CALL
  generatePaperFromAPI(payload:any){
    return this.http.post<any>(`${this.baseUrl}/generate-paper`, payload);
  }
  //VIEW PAPERS API's CALL
  getPapers(){
  return this.http.get<any[]>(`${this.baseUrl}/papers`);
  }
  getPapersBySubject(subject:string){
  return this.http.get<any[]>(
    `${this.baseUrl}/papers/${subject}`
  );
}
  downloadPaperById(id:string){
    return this.http.get(
    `${this.baseUrl}/download/${id}`,
    { responseType: 'blob' as 'json' }
  );
  }
}
