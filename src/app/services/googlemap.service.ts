/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Service to Find Places using Google Maps JavaScript API
 */

/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlaceSearch } from '../model/place/placeSearch';
import { Place } from '../model/place/place';

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  private geocoder: google.maps.Geocoder;
  private placeService: google.maps.places.PlacesService;
  private placeSearchResult: PlaceSearch = new PlaceSearch();

  map: google.maps.Map;
  onAddressFound: Subject<string> = new Subject();
  onPositionFound: Subject<any> = new Subject();
  onPlacesFound: Subject<PlaceSearch> = new Subject();

  private getGeoCoder() {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    return this.geocoder;
  }

  constructor() { }

  findAddress(position) {
    this.getGeoCoder().geocode({'location': position }, (results: [google.maps.GeocoderResult], status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.onAddressFound.next(results[0].formatted_address);
        }
      }
    });
  }

  findPosition(address) {
    this.getGeoCoder().geocode({'address': address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let pos = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        this.onPositionFound.next(pos);
      }
    });
  }
  
  findPlaces(position, placeTypes:string[], radius:number, keyword: string) {
    this.placeService = new google.maps.places.PlacesService(this.map);
    this.placeService.nearbySearch({location: position, radius: radius, types: placeTypes, keyword: keyword}, 
      ((results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          let placeUID = 0;
          this.placeSearchResult.places = results.map(place => {
            let placeInfo = new Place();
            placeInfo.customerPosition = position;
            placeInfo.uid = placeUID++;
            placeInfo.id = place.id;
            placeInfo.location = place.geometry.location;
            placeInfo.name = place.name;
            placeInfo.address = place.vicinity;
            placeInfo.photoUrl = place.photos ?
              (place.photos.length > 0 ?
                place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 }) : "")
              : "";
            placeInfo.open_now = place.opening_hours ?
              (place.opening_hours.open_now ?
                "Opened" : "Closed")
              : "Closed";
            placeInfo.rating = place.rating;
            placeInfo.types = place.types;
            return placeInfo;
          });
          this.onPlacesFound.next(this.placeSearchResult);
      }
      }
    }));
  }
}
