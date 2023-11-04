import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
// import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';

@Component({
  selector: 'app-editar-evaluacion',
  templateUrl: './editar-evaluacion.component.html',
  styleUrls: ['./editar-evaluacion.component.css']
})
export class EditarEvaluacionComponent implements OnInit{
  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}
  
  ngOnInit(): void {
    const sessionData = this.sessionService.getSession();
    //this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }
  }

  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }
}
