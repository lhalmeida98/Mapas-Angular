import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss'],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number,number] = [-78.49026961236352, -0.18848303378950806]

  constructor(){
    console.log('constructor',this.divMapa);

  }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    console.log('after',this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });


    this.mapa.on('zoom', (event)=>{
      // const zoomActual = this.mapa.getZoom();
      this.zoomLevel = this.mapa.getZoom();
 
    })

    this.mapa.on('zoomend', (event)=>{
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18); // para poner el zoom que se desea 
      }
    })

    this.mapa.on('move',(event) => {
      // console.log(event);
      const target = event.target;
      const{lng,lat} = target.getCenter();
      this.center = [lng,lat]
      
    })
  }

  zoomOut() {
    this.mapa.zoomOut();
    //console.log('zoomOut',this.divMapa);
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor:string){
    console.log(valor);
    this.mapa.zoomTo(Number(valor))
  }
}
