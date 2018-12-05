/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Places component to show restaurant markers on Google Map
 * It uses child component (Place.component) to display information and directions
 * for the selected restaurant
 */
/// <reference types="@types/googlemaps" />
import { ViewChild, Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GooglemapService } from '../../services/googlemap.service';
import { PlacesearchdataService } from '../../services/placesearchdata.service';
import { PlaceSearch } from '../../model/place/placeSearch';
import { Place } from '../../model/place/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlacesComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  
  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  placeWindow: google.maps.InfoWindow;
  geocoder: google.maps.Geocoder;
  placeService: google.maps.places.PlacesService;

  onRequestSubject:any;
  currentAddress:string;
  currentPosition:any;
  cuisineType:string;
  selectedPlace:Place;

  private searchRadius: number = 5000;
  private searchTypes: string[] = ['restaurant'];

  constructor(private route: ActivatedRoute,
    private changeDetaction: ChangeDetectorRef,
    private googleMapService: GooglemapService,
    private placeSearchDataService: PlacesearchdataService) { }

  ngOnInit() {
    //subscribe to address subject
    this.googleMapService.onAddressFound.subscribe(address => {
      this.currentAddress = address;
      this.googleMapService.findPosition(this.currentAddress);
    });

    //subscribe to position subject
    this.googleMapService.onPositionFound.subscribe(position => {
      this.currentPosition = position;

      // initialize map and add marker for current position
      if (this.initializeMap(position)) {
        this.addCurrentPositionMarker();
        this.findPlaces(position);
      }
    });

    //subscribe to places subject
    this.googleMapService.onPlacesFound.subscribe(placeSearch => {
      this.placeSearchDataService.updateData(placeSearch);
      this.addPlaces(placeSearch);
      this.changeDetaction.detach();
      let divInitial: HTMLElement = document.getElementById("divInitial") as HTMLElement;
      let divMap: HTMLElement = document.getElementById("divMap") as HTMLElement;
      divInitial.style.display = "none";
      divMap.style.display = "";
    });

    // fire up
    this.onRequestSubject = this.route.params.subscribe(params => {
      this.showHidePlace("none");

      this.currentAddress = params["address"];
      this.cuisineType = params["cuisinetype"]; 
      if (this.cuisineType.toLowerCase() === "all cuisines") {
        this.cuisineType = "";
      }
      this.googleMapService.onAddressFound.next(this.currentAddress);
    });    
  }

  private initializeMap(position) {
    let mapProp = {
      center: new google.maps.LatLng(position.lat, position.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp)
    return true;
  }

  private addCurrentPositionMarker() {
    this.infoWindow = new google.maps.InfoWindow();
    this.map.setZoom(12);
    var marker = new google.maps.Marker({
      position: this.currentPosition,
      map: this.map
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(this.currentAddress);
      this.infoWindow.open(this.map, marker);
    });    
  }

  private findPlaces(position) {
    this.googleMapService.map = this.map;
    this.googleMapService.findPlaces(position, this.searchTypes, this.searchRadius, this.cuisineType);
  }

  private addPlaces(placeSearch:PlaceSearch) {
    placeSearch.places.forEach(place => {
      this.addPlacesMarker(place);
    });
  }

  private addPlacesMarker(place: Place) {
    this.placeWindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
      map: this.map,
      position: place.location,
      icon: 'http://maps.google.com/mapfiles/kml/pal2/icon33.png'
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.selectedPlace = this.placeSearchDataService.getPlace(place.uid);
      this.showHidePlace("");
    });
  }

  showHidePlace(displayStyle) {
    let placeDetail: HTMLElement = document.getElementById("place-detail") as HTMLElement;
    placeDetail.style.display = displayStyle;
    this.changeDetaction.detectChanges();
  }
}