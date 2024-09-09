import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-scrollbanner',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './scrollbanner.component.html',
  styleUrls: ['./scrollbanner.component.css']
})
export class ScrollbannerComponent implements OnDestroy {
 
  myFunction = () => {
    // Long-running asynchronous operation
    console.log('Function started');
    this.startAutoScroll();
    console.log('executed Immediately started');

    // ...
    return 'Result';
  };

  // Use Observable for asynchronous function execution
  ngOnInit(): void {
   

  }
  items = [
    {
      link: '/vijay-prakash-sep21-2024/event',
      srcset: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_2000/c_crop%2Fg_custom%2Fv1722576066%2Fkoqrpml3gtaxnli4mj1l.jpg',
      src: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_560/c_crop%2Fg_custom%2Fv1722576066%2Fkoqrpml3gtaxnli4mj1l.jpg',
      alt: 'Event 1'
    },
    {
      link: '/chandan-shetty-live-in-bangalore-nov24-2024/event',
      srcset: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_2000/c_crop%2Fg_custom%2Fv1722587665%2Ffea1lja4xhsassmhm8k3.jpg',
      src: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_560/c_crop%2Fg_custom%2Fv1722587665%2Ffea1lja4xhsassmhm8k3.jpg',
      alt: 'Event 2'
    },
    {
      link: '/jollywood-best-amusement-park-resorts-in-bangalore/event',
      srcset: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_2000/c_crop%2Fg_custom%2Fv1718807157%2Fpz08ykl20gmefdtfr8mv.jpg',
      src: 'https://res.cloudinary.com/dwzmsvp7f/image/upload/q_75,f_auto,w_560/c_crop%2Fg_custom%2Fv1718807157%2Fpz08ykl20gmefdtfr8mv.jpg',
      alt: 'Event 3'
    }
  ];

  currentIndex = 0;
  intervalId: any;

  

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoScroll(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    if (this.currentIndex === 0) { // Reset to the first slide after reaching the end
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.nextSlide(), 3000);
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}