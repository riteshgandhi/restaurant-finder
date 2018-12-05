/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Search Component
 */
import { ViewChild, Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CuisinedataService } from '../../services/cuisinedata.service';
import { CuisineTypeInfo } from 'src/app/model/cusine/cuisineTypeInfo';
import { GooglemapService } from '../../services/googlemap.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @ViewChild('placeAaddress') placeAaddressElement: any;
  cuisines: CuisineTypeInfo = new CuisineTypeInfo();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _ngZone: NgZone,
    private googleMapService:GooglemapService,
    private cuisineService: CuisinedataService) { }

  ngOnInit() {
    // subscribe to address subject
    this.googleMapService.onAddressFound.subscribe(address => {
      this.placeAaddressElement.nativeElement.value = address;
      this.placeAaddressElement.nativeElement.placeholder = "Enter Location";
      //use ngzone.run
      this._ngZone.run(() => { 
        this.router.navigateByUrl(`/places/${address}/${this.cuisines.defaultType.name}`);
      });
    });

    // subscribe to cuisine data subject
    this.cuisineService.onCuisineDataSubject.subscribe((cuisines: CuisineTypeInfo) => {
      this.cuisines = cuisines;
    });

    // get cuisine data
    this.cuisineService.getCuisineTypes();    
    // get current address
    this.findCurrentAddress();
  }

  findCurrentAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.googleMapService.findAddress(currentPosition);
      });
    }
  }

  searchPlaces = () => {
    let address = this.placeAaddressElement.nativeElement.value;
    if (address && address.trim().length>0) {
      this.googleMapService.onAddressFound.next(address);
    } else {
      this.placeAaddressElement.nativeElement.reportValidity();
    }
  }
}
