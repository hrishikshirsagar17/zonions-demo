import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  id: number;
  restaurant: Restaurant;
  submitted = false;

  opentime = {hour: 10, minute: 10};

  closetime = {hour: 10, minute: 10};


  constructor(private route: ActivatedRoute, private router: Router,
              private restaurantService: RestaurantService, private httpClient: HttpClient,
              private logger: NGXLogger) { }

  ngOnInit(): void {

    this.restaurant = new Restaurant();

    this.id = this.route.snapshot.params.id;

    this.restaurantService.getRestaurant(this.id)
      .subscribe(data => {
        this.logger.log(data);
        this.restaurant = data;
      },  error => {
        if (error.status === 500){
          this.router.navigate(['/500']);
        }
      });
  }

  updateRestaurant(): void {
    this.restaurantService.updateRestaurant(this.id, this.restaurant)
      .subscribe(data => {
        this.logger.log(data);
        this.restaurant = new Restaurant();
      },  error => {
        if (error.status === 500){
          this.router.navigate(['/500']);
        }
      });
  }

  onSubmit(): void {
    this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute;
    this.submitted = true;
    this.updateRestaurant();
  }

  revert(): void {
    this.router.navigate(['/home']);
  }

  // Gets called when the user selects an image
  public onFileChanged(event): void {
    // Select File
    this.selectedFile = event.target.files[0];
  }


  // Gets called when the user clicks on submit to upload the image
  onUpload(): void {
    this.logger.log(this.selectedFile);

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/zonions/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Menu uploaded successfully';
        } else {
          this.message = 'Menu not uploaded successfully';
        }
      },
      error => {
        if (error.status === 500){
          this.router.navigate(['/500']);
        }
      }

      );

    }

}
