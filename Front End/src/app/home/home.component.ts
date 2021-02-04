import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Observable<Restaurant[]>;
  supportLanguages = ['en', 'fr', 'de', 'hi'];
  constructor(private restaurantService: RestaurantService, private router: Router,
              private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
  }

  ngOnInit(): void {

    this.reloadData();
  }

  reloadData(): void {
    this.restaurants = this.restaurantService.getRestaurantsList();

    this.restaurants.subscribe(data => {
      console.log(data);

    });

  }

  restaurantDetails(id: number): void {
    this.router.navigate(['details', id]);
  }
}
