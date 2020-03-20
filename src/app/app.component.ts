import { Component, ViewChild, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // latitude = 60.540687199;
  // longitude = 10.447631633;

  // lat1 = 60.11659072267518;
  // lng1 = 9.524920983481762;
  // lat2 = 60.36742397805124;
  // lng = 10.986102624106762;

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  // rooms = [
  //   {
  //     "lat": 60.11659072267518,
  //     "long" : 9.524920983481762
  //   },
  //   {
  //     "lat": 60.36742397805124,
  //     "long": 10.986102624106762
  //   }
  // ];

  // onMapClick(event) {
  //   console.log(event)
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  // }

  places = [
    {
      "lat": 59.284073,
      "lan": 11.109403,
      "name": "Sarpsborg"
    },
    {
      "lat": 69.650253,
      "lan": 18.995115,
      "name": "Tromsdalen"
    },
    {
      "lat": 58.969975,
      "lan": 5.733107,
      "name": "Stavanger"
    },
    {
      "lat": 59.911491,
      "lan": 10.757933,
      "name": "Oslo"
    }
  ];

  ngOnInit() {
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    const mapProperties = {
      center: new google.maps.LatLng(60.4720, 8.4689),
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    directionsRenderer.setMap(this.map);

    // waypoints to get the completed path
    var waypts = [
      // {
      //   location: new google.maps.LatLng( 69.650253, 18.995115),
      //   stopover: true
      // },
      // {
      //   location: new google.maps.LatLng( 58.969975, 5.733107),
      //   stopover: true
      // }
    ];
    var startCoordinate = null;
    var endCoordinate = null;

    // Looping the markers
    for(let i = 0; i < this.places.length; i++) {
      var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.places[i].lat, this.places[i].lan),
      map: this.map,
      title: this.places[i].name
      });

      if (i === 0) {
        startCoordinate = new google.maps.LatLng(this.places[i].lat, this.places[i].lan);
      } else if (i === (this.places.length - 1)) {
        endCoordinate = new google.maps.LatLng(this.places[i].lat, this.places[i].lan);
      } else {
        waypts.push({
          location: new google.maps.LatLng(this.places[i].lat, this.places[i].lan),
          stopover: true
        })
      }
      

    }

    console.log('start ', startCoordinate)
    console.log('end ', endCoordinate)
    console.log('waypt ', waypts)
    // drawing the location routes

    directionsService.route({
      origin: startCoordinate,
      destination: endCoordinate,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      console.log('direction response ', response)
      console.log('status ', status)
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.log('erro in routes')
      }
    });
   


    
  }
}
