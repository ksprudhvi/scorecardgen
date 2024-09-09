import { Component, OnInit } from '@angular/core';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-competation-details',
  templateUrl: './competation-details.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule],
  styleUrls: ['./competation-details.component.css']
})
export class CompetationDetailsComponent implements OnInit {
  eventId:string=''
  directionUrl:string='https://maps.app.goo.gl/4f42zLjafaXB6pg89'

  EventData !:any;
  responseData!: Object;
  error!: any;
  TeamsInfo!: any;
  JudegsInfo!: any;
  loading!:Boolean ;
  successMessage !:any;
  errorMessage !:any;
  isLive = true;
  isCompleted = false;
  profileData: any ;
  HostAccess: any ;
  constructor(private router: Router,private authService: AuthService ,private authGuard: AuthGuard,private activatedRoute: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
     if (this.eventId) {
       // Use the eventId here, e.g., for data fetching or processing
       console.log('Retrieved eventId:', this.eventId);
       // Call a service to fetch data based on eventId (optional)
     } else {
       // Handle the case where 'eventId' is not present
       console.error('eventId parameter not found in query string.');
     }
   });

   const url = 'https://competationhoster.azurewebsites.net/getEvent/';
   this.profileData=localStorage.getItem('UserProfile')
   this.HostAccess=localStorage.getItem('HostAccess')
    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data ={
      EventId:this.eventId
    }
    const jsonData = JSON.stringify(data);
    // Make the POST request with the provided data
    this.http.post(url, jsonData, { headers }).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        this.EventData = response;
        if(this.EventData['status']="Live"){
          this.isLive=true;
          this.isCompleted=false;
        }
        if(this.EventData['status']="Completed"){
          this.isLive=false;
          this.isCompleted=true;
        } // Assign response to a variable to use in template
      },
      (error) => {
        console.info('Error making POST request:', error);
        this.error = error.message || 'An error occurred'; // Set error message
      }
    );
    console.log(this.responseData);
    const urlForteamsJudges = `https://competationhoster.azurewebsites.net/getTeamsJudges/${this.eventId}`;
    this.http.get<any>(urlForteamsJudges).subscribe(
      (data) => {
        // Assign the received data to eventMetaData
        this.TeamsInfo = data[0].teamsInfo;
        this.JudegsInfo = data[0].JudegsInfo;
        console.info('TeamsInfo ', this.TeamsInfo);
        console.info('JudegsInfo: ',  this.JudegsInfo);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }
  

  toggleLive() {
    this.loading=true;
    this.isLive = !this.isLive;
    if(this.isLive==true){
      this.EventData['status']="Live";
      const url = 'https://competationhoster.azurewebsites.net/Updatecompetition';
    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data=this.EventData;
    console.log('data',data)
    const jsonData = JSON.stringify(data);
    // Make the POST request with the provided data
    this.http.post<any>(url, jsonData, { headers }).subscribe(
      (responseDta) => {
        console.log('POST request successful:', responseDta);
       //this.ScoreCard = responseDta.scorecard;
       this.loading=false;
       this.successMessage = 'Market Live Succesfully '; 
       setTimeout(() => this.successMessage=(null), 2000);
        // Assign response to a variable to use in template
     },
     (error) => {
      this.loading=false;
       console.info('Error making POST request:', error);
       this.errorMessage = 'Error Occured  '; 
       setTimeout(() => this.errorMessage=(null), 2000);
     }
    );
  }
}

  toggleCompleted() {
    this.loading=true;
    this.isCompleted = !this.isCompleted;
    if(this.isCompleted==true){
      this.EventData['status']="Completed";
      const url = 'https://competationhoster.azurewebsites.net/Updatecompetition';
    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data=this.EventData;
    console.log('data',data)
    const jsonData = JSON.stringify(data);
    // Make the POST request with the provided data
    this.http.post<any>(url, jsonData, { headers }).subscribe(
      (responseDta) => {
        console.log('POST request successful:', responseDta);
       //this.ScoreCard = responseDta.scorecard;
       this.loading=false;
       this.successMessage = 'Market Completed Succesfully '; 
       setTimeout(() => this.successMessage=(null), 2000);
        // Assign response to a variable to use in template
     },
     (error) => {
      this.loading=false;
       console.info('Error making POST request:', error);
       this.errorMessage = 'Error Occured  '; 
       setTimeout(() => this.errorMessage=(null), 2000);
     }
    );
    this.emailScoreCards();
    }
  }
  emailScoreCards() {
    const url = 'https://competationhoster.azurewebsites.net/send-scorecard';
    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data={
      EventId:this.eventId
    }
    console.log('data',data)
    const jsonData = JSON.stringify(data);
    // Make the POST request with the provided data
    this.http.post<any>(url, jsonData, { headers }).subscribe(
      (responseDta) => {
        console.log('POST request successful:', responseDta);
       //this.ScoreCard = responseDta.scorecard;this.loading=false;
       this.successMessage = 'Sent Event Schedule Email  Succesfully '; 
       setTimeout(() => this.successMessage=(null), 2000);
        // Assign response to a variable to use in template
     },
     (error) => {
       console.info('Error making POST request:', error);
       this.errorMessage = 'Error Occured  '; 
       setTimeout(() => this.errorMessage=(null), 2000);
     }
    );


  }
  NavigateToAccessTokens():void{
   
    this.HostAccess=localStorage.getItem('HostAccess')
    if (this.HostAccess=="true") 
    {
       const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
     // Construct the URL manually
     const url = this.router.createUrlTree(['getAccessTokens'], navigationExtras).toString();
     const baseUrl = window.location.origin; // Get the base URL of the application
     const fullUrl = `${baseUrl}${url}`;
     // Open the URL in a new tab
     window.open(fullUrl, '_blank');
  }else{
       const currentUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });

    //  this.NavigateToAccessTokens()

  }

  }

  NavigateToLeadBord():void{

    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
     // Construct the URL manually
     const url = this.router.createUrlTree(['viewLeadBord'], navigationExtras).toString();
     const baseUrl = window.location.origin; // Get the base URL of the application
     const fullUrl = `${baseUrl}${url}`;
     // Open the URL in a new tab
     window.open(fullUrl, '_blank');

  }

  NavigateEventSchedule():void{

    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
     // Construct the URL manually
     const url = this.router.createUrlTree(['eventOrderConfig'], navigationExtras).toString();
     const baseUrl = window.location.origin; // Get the base URL of the application
     const fullUrl = `${baseUrl}${url}`;
     // Open the URL in a new tab
     window.open(fullUrl, '_blank');

  }
  isOpen = false;
 
  openPopup() {
    this.isOpen = true;
  }

  closePopup() {
    this.isOpen = false;
    // You can add logic to handle form submission or data processing here
  }

  NavigateToScoreCard(): void {
    //this.openPopup()
    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
    this.router.navigate(['scoreCard'], navigationExtras);// Replace with your desired rout
  }

  updateTeam():void{
    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
    this.router.navigate(['addTeam'], navigationExtras);
    //this.router.navigate(['addTeam']); // Replace with your desired rout
  }

  updateJudges():void {
    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
    this.router.navigate(['confJudges'], navigationExtras);
    //this.router.navigate(['addTeam']); // Replace with your desired rout
  }

}
