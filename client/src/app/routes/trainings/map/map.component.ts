import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../services/user/user.service";
import {Marker} from '../../../common/Marker';
import {TrainingsService} from "../../../services/trainings/trainings.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class TrainingsMapComponent implements OnInit {
  //config map zoom level and inital center map on coordinates
  zoom: number = 6;
  lat: number = 50.589095;
  lng: number = 11.600845;

  markers: Marker[];

  constructor(private router: Router,
              private trainingsService: TrainingsService) {
  }

  ngOnInit() {
    this.trainingsService
      .getMapMarkers()
      .subscribe(
        data => {
          this.markers = data;
        },
        error => console.log(error)
      );
  }


  onClick(id: string) {
    this.router.navigate(['Single', {userid: id}]);
  }

  styles = [
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#d3d3d3"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "color": "#808080"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#b3b3b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "weight": 1.8
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#d7d7d7"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ebebeb"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#a7a7a7"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#efefef"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#696969"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#737373"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#d6d6d6"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {},
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    }
  ];
}
