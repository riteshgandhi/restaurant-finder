/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Service to Store and Retrieve Places
 */

import { Injectable } from '@angular/core';
import { PlaceSearch } from '../model/place/placeSearch'
import { Place } from '../model/place/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesearchdataService {
  private placeSearchDataSource = 'GANDHI_RF_DATA';

  constructor() { }

  updateData(placeSearchResult: PlaceSearch) {
    try {
      if (this.isStorageEnabled()) {
        localStorage.setItem(this.placeSearchDataSource, JSON.stringify(placeSearchResult));
      }
    } catch {
      // ignore error      
    }
  }

  private getSearchResults(): PlaceSearch {
    if (this.isStorageEnabled() &&
      localStorage.getItem(this.placeSearchDataSource) != null) {
        return JSON.parse(localStorage.getItem(this.placeSearchDataSource));
    }
  }

  private isStorageEnabled(): boolean {
    return (typeof (Storage) !== "undefined") ? true : false;
  }

  getPlace(id:number): Place {
    let placeSearchData = this.getSearchResults();
    if (placeSearchData) {
      return placeSearchData.places.find(place => place.uid == id);
    }
  }

  getCurrentLocation() {
    let placeSearchData = this.getSearchResults();
    if (placeSearchData) {
      return placeSearchData.currentLocation;
    }
  }

  getCurrentPosition() {
    let placeSearchData = this.getSearchResults();
    if (placeSearchData) {
      return placeSearchData.currentPosition;
    }
  }
}
