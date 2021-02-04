import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  submitted = false;
  file: any;
  rest: any;


  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  num: number;

  opentime = { hour: 10, minute: 10 };
  closetime = { hour: 10, minute: 10 };
  supportLanguages = ['en', 'fr', 'de', 'hi'];

  constructor(private restaurantService: RestaurantService,
              private router: Router, private httpClient: HttpClient,
              private logger: NGXLogger, private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
  }


  ngOnInit(): void {
  }

  useLang(lang: string): void {
    console.log('selected language ==> ', lang);
    this.translateService.use(lang);
  }
  newRestaurant(): void {
    this.submitted = false;
    this.restaurant = new Restaurant();
  }

  save(): void {
    this.restaurantService
      .createRestaurant(this.restaurant).subscribe(data => {
        this.logger.log(data);
        this.rest = data;
        this.logger.log(this.restaurant.openTime);

        this.revert();
      },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
  }

  onSubmit(): void {
    this.restaurant.openTime = this.opentime.hour + ':' + this.opentime.minute;
    this.restaurant.closeTime = this.closetime.hour + ':' + this.closetime.minute;
    this.submitted = true;
    this.save();


  }


  revert(): void {
    this.router.navigate(['/home']);
  }


  public onFileChanged(event): void {

    this.selectedFile = event.target.files[0];
  }



  onUpload(): void {
    this.logger.log(this.selectedFile);


    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);


    this.httpClient.post('http://localhost:8080/zonions/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Menu uploaded successfully';
        } else {
          this.message = 'Failed to upload Menu';
        }
      }

      );

  }



}
