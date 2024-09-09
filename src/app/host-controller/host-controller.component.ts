import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-host-controller',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './host-controller.component.html',
  styleUrl: './host-controller.component.css'
})
export class HostControllerComponent implements OnInit {
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  hostRequests: any[] = [];
  fetchUrl = 'https://competationhoster.azurewebsites.net/approveHostAccess';
  createAccessUrl = 'https://competationhoster.azurewebsites.net/CreateHostAccess';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchHostRequests();
   
  }

  // Fetch host requests from the server
  fetchHostRequests() {
    this.http.post<any[]>(this.fetchUrl, {}).subscribe(
      (response) => {
        this.hostRequests = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching host requests:', error);
      }
    );
  }

  // Approve a host request
  approveRequest(request: any) {
    const requestBody = {
      Email: request.Email,
    };
    this.loading = true;
    this.http.post(this.createAccessUrl, requestBody).subscribe(
      () => {
        this.loading = false;
        alert(`Host access approved for ${request.Email}`);
        this.hostRequests = this.hostRequests.filter(
          (r) => r.Email !== request.Email
        );
      },
      (error) => {
        this.loading = false;
        console.error('Error approving host access:', error);
        alert('Error approving host access. Please try again.');
      }
    );
  }

  // Reject a host request (can be enhanced as needed)
  rejectRequest(request: any) {
    alert(`Host request rejected for ${request.Email}`);
    this.hostRequests = this.hostRequests.filter(
      (r) => r.Email !== request.Email
    );
  }

}
