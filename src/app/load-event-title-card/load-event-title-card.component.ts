import { Component } from '@angular/core';

@Component({
  selector: 'app-load-event-title-card',
  standalone: true,
  imports: [],
  templateUrl: './load-event-title-card.component.html',
  styleUrl: './load-event-title-card.component.css'
})
export class LoadEventTitleCardComponent {


  eventData :any ={
    "EventId": "e91cedee-a5ee-4e22-b49a-30c20cafd624",
    "eventImageUrl": "",
    "eventTitle": "Hip HOp Heat Wave",
    "eventCategory": "Tour",
    "eventDateString": "March 12 th from 5 Pm to 6 Pm",
    "eventVenue": "Hyderabad",
    "eventPriceString": "10 Onwards"
  };

}
