import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss'],
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor(){
    console.log('constructor',this.divMapa);

  }

  ngAfterViewInit(): void {

    console.log('after',this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.49026961236352, -0.18848303378950806],
      zoom: this.zoomLevel
    });
  }

  zoomOut() {
    this.mapa.zoomOut();
    //console.log('zoomOut',this.divMapa);

    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();

  }
}
