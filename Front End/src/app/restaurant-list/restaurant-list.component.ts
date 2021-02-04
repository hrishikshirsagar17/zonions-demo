import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Observable<Restaurant[]>;
  constructor(private restaurantService: RestaurantService, private router: Router,
              private logger: NGXLogger) { }

  ngOnInit(): void {

    this.reloadData();
  }

  reloadData(): void
  {
    this.restaurants = this.restaurantService.getRestaurantsList();

    this.restaurants.subscribe (data => {
      this.logger.log(data);

    },
    error => {
      if (error.status === 500){
        this.router.navigate(['/500']);
      }
    });

  }

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id)
      .subscribe(
        data => {
          this.logger.log(data);
          this.reloadData();
        },
        error => {
          if (error.status === 500){
            this.router.navigate(['/500']);
          }
        });
  }

  restaurantDetails(id: number): void{
    this.router.navigate(['details', id]);
  }


  updateRestaurant(id: number): void
  {
    this.router.navigate(['update', id]);
  }

}
