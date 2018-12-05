/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Service to get data for Cusine Types
 */

import { Injectable } from '@angular/core';
import { CuisineTypeInfo } from '../model/cusine/cuisineTypeInfo';
import { CuisineType } from '../model/cusine/cuisineType';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuisinedataService {
  onCuisineDataSubject: Subject<CuisineTypeInfo> = new Subject();

  constructor() { }

  getCuisineTypes() {
    let cuisineInfo: CuisineTypeInfo = new CuisineTypeInfo();
    let defaultType: CuisineType = { name: "All Cuisines", value: 1 };

    cuisineInfo.defaultType = defaultType;
    cuisineInfo.cuisineTypes = [
      { name: "All Cuisines", value: 1 },
      { name: "American", value: 2 },
      { name: "Indian", value: 3 },
      { name: "Italian", value: 4 },
      { name: "Chinese", value: 5 },
      { name: "Mexican", value: 6 },
      { name: "Thai", value: 7 },
      { name: "Bakery", value: 8}
    ];
    this.onCuisineDataSubject.next(cuisineInfo);
  }
}
