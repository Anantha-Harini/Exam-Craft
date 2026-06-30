import { Component ,signal,inject} from '@angular/core';
import { AuthService } from '../auth-service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    errorMessage=signal('');
    authService=inject(AuthService);
    http=inject(HttpClient)
    login(uname:string,pass:string){
        if(uname==='' || pass===''){
            this.errorMessage.set('Please enter both username and password');
            setTimeout(()=>{this.errorMessage.set('')},3000)
            return;
        }
        this.http.post<{success:Boolean}>("https://automated-question-paper-generation.onrender.com/api/login",{username:uname,password:pass,role:"admin"})
        .subscribe((data)=>{
            if(data.success===true)
            {this.authService.login(uname);}
            else
            {
                this.errorMessage.set('Invalid username or password');
                setTimeout(()=>{this.errorMessage.set('')},3000)
            }
        })
    }
}
