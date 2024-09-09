import { Component, OnInit  } from '@angular/core';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddTeaminfoComponent } from '../add-teaminfo/add-teaminfo.component';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-competation-deatils-updater',
  standalone: true,
  imports: [FormsModule, CommonModule,ImageUploaderComponent,ImageCropperModule],
  templateUrl: './event-lister.component.html',
  styleUrl: './event-lister.component.css'
})

export class EventListerComponent  implements OnInit{
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;
  imageUrl!: string | ArrayBuffer | null;
  selectedCategory: string = '';
  selectedAge: string = '';
  selectedLanguage: string = '';
  eventImageUrl: string ='';
  directionUrl: string ='replace with  Direction Url'
  eventTitle: string="Enter Your Event Title"
  eventTitleVenue: string="Enter Title Venue"
  eventDateString: string="Enter Date and time Info" ;
  eventPriceString :string="Enter Price Info"
  eventId:string='cjvsdjc'
  responseData!: any;
  error: any;
  options: string[] = ['Tap', 'Hip-Hop', 'Jazz'];
  selectedOptions: boolean[] = [false, false, false];
  isTextChecked: boolean = false;
  enteredText: string = '';
  loading!:Boolean ;
  successMessage !:any;
  errorMessage !:any;

  constructor(private uploadService: FileUploadService,private router: Router,private http: HttpClient) {

    this.eventId = uuidv4();
        console.log(this.eventId);
  }
  onCategoryChange(category: string): void {
    console.log('Selected category:', category);
    this.selectedCategory=category 
   }
  conditions: string[] = [
    'Children below 5 years can enter for free.',
    'Outside food and beverages are not allowed.',
    'Entry tickets are non-refundable.',
    'The management reserves the right to admission.'
  ];
  CompetitionHighlights: string[] = [
    'Competition Opening ceremony at 09:45 am.',
    'Shopping at abcd '
  ];
  forEntryRules: string[] = [
    'Each ticket admits one person only.' ,
     'Children below 33" height will not be charged.' ,
     'The ticket is valid for the day of reservation. ' ,
     'Personal food, beverages, and bottled water are not allowed - except for diabetics and infants.' ,
    'The parking ticket is valid for one day; the vehicle parked is at the owner’s risk.'
  ];
 
  updateDirectionUrl(event: any) {
    // Update directionUrl with the new value from the input event
    this.directionUrl = event.target.innerText.trim(); // Trim to remove leading/trailing whitespace
    // Here you can implement the logic to save directionUrl to your backend or local storage
    // For example, you can make an HTTP request to your backend API to save the updated directionUrl
    // Replace the comment below with your actual saving logic
    // this.saveDirectionUrl(this.directionUrl);
  }
  addNewCondition() {
    this.conditions.push(' Add new condition');
  }
  addforEntryRules() {
    this.forEntryRules.push('Add new Entry Rule');
  }
  addCompetitionHighlights() {
    this.CompetitionHighlights.push(' Add new Highlight');
  }
  saveEventParentCreateChilds(): void{
    const selectedCategories = this.options.filter((option, index) => this.selectedOptions[index]);
    console.log('Selected Options:', selectedCategories);

  }
  
  saveData(): void {
    this.loading=true;
    const selectedCategories = this.options.filter((option, index) => this.selectedOptions[index]);
    console.log('Selected Options:', selectedCategories);
    interface EventElement extends HTMLElement {
      innerText: string;
    }
    
    const eventTitleList: EventElement[] = [
      document.querySelector('[data-ref="edp_event_title_desktop"]') as EventElement,
      document.querySelector('[data-ref="edp_event_title_mobile"]') as EventElement,
      document.querySelector('[data-ref="edp_event_title_tablet"]') as EventElement,
    ];
    const eventCategoryList: EventElement[] = [
      document.querySelector('[data-ref="edp_event_category_mobile"]') as EventElement,
      document.querySelector('[data-ref="edp_event_category_tablet"]') as EventElement,
    ];
    const eventDateStringList: EventElement[] = [
      document.querySelector('[data-ref="edp_event_datestring_desktop"]') as EventElement,
      document.querySelector('[data-ref="edp_event_datestring_mobile"]') as EventElement,
      document.querySelector('[data-ref="edp_event_datestring_tablet"]') as EventElement,
    ];
    const eventVenueList: EventElement[] = [
      document.querySelector('[data-ref="edp_event_venue_desktop"]') as EventElement,
      document.querySelector('[data-ref="edp_event_venue_mobile"]') as EventElement,
      document.querySelector('[data-ref="edp_event_venue_tablet"]') as EventElement,
    ];
    const eventPriceList: EventElement[] = [
      document.querySelector('[data-ref="edp_price_string_desktop"]') as EventElement
    ];
    const data = {

      EventId:this.eventId,
      eventImageUrl:this.eventImageUrl,
      eventTitle: eventTitleList.find(
        (element) => element.innerText.trim() !== 'Enter Your Event Title'
      )?.innerText.trim(),
      eventCategory:selectedCategories,
      eventDateString: eventDateStringList.find(
        (element) => element.innerText.trim() !== 'Enter Date and Time'
      )?.innerText.trim(),
      eventVenue:eventVenueList.find(
        (element) => element.innerText.trim() !== 'Enter Title Venue'
      )?.innerText.trim() ,
      eventPriceString: eventPriceList.find(
        (element) => element.innerText.trim()!== 'Enter Price Info'
      )?.innerText.trim() ,
    };
    // Convert data to JSON
    const jsonData = JSON.stringify(data);
    // Here, you can save jsonData using your preferred method (e.g., sending it to a server, storing it locally)
    const url = 'https://competationhoster.azurewebsites.net/competition';

    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request with the provided data
    this.http.post(url, jsonData, { headers }).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        this.responseData = response; 
        this.loading=false
        this.successMessage="Event Details Saved Succesfully";
        setTimeout(() => this.successMessage=(null), 2000);
        // Assign response to a variable to use in template
      },
      (error) => {
        console.info('Error making POST request:', error);
        this.errorMessage = 'An error occurred .Please Try again'; 
        setTimeout(() => this.errorMessage=(null), 2000);// Set error message
      }
    );
    console.log(this.responseData);
  } 

  saveandNavifatetoTeamsInfo(): void {
    this.saveData();
    const navigationExtras: NavigationExtras = {
      queryParams: { eventId:this.eventId },
      state: { someOtherData: 'value' } // Optionally pass additional data
    };
    this.router.navigate(['addTeam'], navigationExtras);
    //this.router.navigate(['addTeam']); // Replace with your desired rout
  }
  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }
  previewStatus: boolean = false;
  imageUploder: boolean = true;

  showPreview() {
    this.previewStatus = true;
    this.imageUploder= false;
  }
  
  showUploader() {
    this.previewStatus = false;
    this.imageUploder= true;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    this.showPreview()
    this.currentFile = event.target.files[0];
    this.uploadFileLatest(file,this.eventId)
  }


  uploadFileLatest(file: File, eventId: string) {
    

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('EventId', eventId);

    this.http.post('https://competationhoster.azurewebsites.net/upload', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    }).subscribe(
      (event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            this.progress = 100; // Set progress to 100%
            if (event instanceof HttpResponse) {
              console.log('Response:', event.body);
              const response=event.body
              this.eventImageUrl=response.ImageUrl;
              this.message = 'File uploaded successfully';
            }
            break;
        }
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.message = 'Failed to upload file.';
      }
    );
  }

  imageCropped(event: any): void {
    // Handle the cropped image data here
    console.log('Cropped Image Data:', event.base64);
    // You can save the cropped image data or perform other actions
  }
  
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
          this.previewStatus = true;
          this.imageUploder= false;
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        
        reader.readAsDataURL(this.currentFile);
      }
    }
   
  }
  upload(file: File | undefined): void {
    this.progress = 0;
  
    if (file) {
      this.currentFile = file;
  
      this.uploadService.upload(this.currentFile).subscribe( (response) => {
        console.log('POST request successful:', response);
        this.responseData = response; // Assign response to a variable to use in template
      },
      (error) => {
        console.info('Error making POST request:', error);
        this.error = error.message || 'An error occurred'; // Set error message
      }
    );
    } else {
      console.error('No file selected');
    }
  }
  uploadFile(file: File) {
    this.progress = 0;
    this.uploadService.upload(file).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        this.responseData = response; // Assign response to a variable to use in template
      },
      (error) => {
        console.info('Error making POST request:', error);
        this.error = error.message || 'An error occurred'; // Set error message
      }
    );
  }
  

}
function saveDataandNavigateToTeamsInfo() {
  throw new Error('Function not implemented.');
}
