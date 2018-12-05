/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Service to get Directions using MapQuest API
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Direcrion {
  dirSubject: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  getDirection(startLocation: string, endLocation: string) {
    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=rG4ziw4jBny51jLDTtRg7FiZYQgHMDTf&from=${startLocation}&to=${endLocation}&outFormat=json`;
    this.dirSubject.next(this.http.get(url));
  }
}
