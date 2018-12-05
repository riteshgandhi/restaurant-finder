/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Place component to show restaurant information and directions
 */
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { Place } from '../../model/place/place';
import { Direcrion } from '../../services/direction.service'

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlaceDetailComponent implements OnInit {
  @Input() currentPlace: Place;
  directions: any;

  private starRating:string[] = ['fa fa-star','fa fa-star','fa fa-star','fa fa-star','fa fa-star'];

  constructor(private directionService: Direcrion, 
    private changeDetection: ChangeDetectorRef) { }

  ngOnInit() { 
    this.directionService.dirSubject.subscribe((result: any) => {
      result.subscribe(value => {
        if (value.route.legs) {
          this.directions = value.route.legs[0].maneuvers;
          this.changeDetection.detectChanges();
        }
      });
    });
  }

  ngOnChanges() {
    this.directions = null;
    this.hideDirectionDiv(null);
    this.getDirections();
  }

  generateRating() {
    if (this.currentPlace) {
      for (let i = 0; i < this.starRating.length; i++) {
        if (this.currentPlace.rating >= i) {
          this.starRating[i] += ' checked';
        }
      }
      return this.starRating;
    }
  }

  getDirections() {
    if (this.currentPlace) {
      let startLatLng = this.currentPlace.customerPosition;
      let strStartLatLng = `${startLatLng.lat},${startLatLng.lng}`;
      let strEndLatLng = `${this.currentPlace.location.lat},${this.currentPlace.location.lng}`;
      this.directionService.getDirection(strStartLatLng, strEndLatLng);
    }
  }

  hideDirectionDiv(event: any) {
    let divDirections: HTMLElement = document.getElementById("divDirections") as HTMLElement;
    let divMain: HTMLElement = document.getElementById("divMain") as HTMLElement;
    divDirections.style.display = "none";
    divMain.style.display = "";

    let lnkInfo: HTMLElement = document.getElementById("lnkInfo") as HTMLElement;
    let lnkDirections: HTMLElement = document.getElementById("lnkDirections") as HTMLElement;
    lnkDirections.classList.remove("active");
    lnkInfo.classList.add("active");
  }

  hideInfoDiv(event: any) {
    let divDirections: HTMLElement = document.getElementById("divDirections") as HTMLElement;
    let divMain: HTMLElement = document.getElementById("divMain") as HTMLElement;
    divDirections.style.display = "";
    divMain.style.display = "none";

    let lnkInfo: HTMLElement = document.getElementById("lnkInfo") as HTMLElement;
    let lnkDirections: HTMLElement = document.getElementById("lnkDirections") as HTMLElement;
    lnkInfo.classList.remove("active");
    lnkDirections.classList.add("active");
  }
}
