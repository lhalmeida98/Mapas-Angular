import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  
      #map{
        height:100%;
        width:100%;
      }

  `]
})
export class FullScreenComponent implements OnInit {
  ngOnInit(): void {
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[ -78.49026961236352,-0.18848303378950806],
  zoom:14
});

  }

}
