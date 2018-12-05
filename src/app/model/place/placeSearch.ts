/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Places Search Results Model. Contains array of Place
 */
import { Place } from './place';

export class PlaceSearch {
    currentLocation: string;
    currentPosition: {lat: number, lng: number};
    places: Place[];
}