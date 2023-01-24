import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('map') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-78.49026961236352, -0.18848303378950806];

  // Arreglo de marcadores
  //marcadores: mapboxgl.Marker[] = [];
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    const marketHtml: HTMLElement = document.createElement('div');
    marketHtml.innerHTML = 'Hola mundo';

    /* const marker = new mapboxgl.Marker({
      //element:marketHtml para ponder marcadores personalizados
    })
      .setLngLat(this.center)
      .addTo(this.mapa) */

  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); // para generar un color nuevo 
    const nuevoMarcador = new mapboxgl.Marker({
      draggable:true, // para pooder mover marcadores en el mapa
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });
  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
    console.log(marker.getLngLat());
  }

  guardarMarcdoresLS(){

    const lngLatArr: MarcadorColor[] = [];


    this.marcadores.forEach(m=>{
      const color = m.color;
      const {lng,lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat],
        
      });
    })

    localStorage.setItem('marcadores',JSON.stringify(lngLatArr))

  }

  leerLS(){

  }
}
