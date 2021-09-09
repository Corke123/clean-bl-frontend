import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportLocation } from 'src/app/shared/model/report-location';
import { ReportLocationsService } from 'src/app/shared/services/report-locations.service';

@Component({
  selector: 'app-reports-map',
  templateUrl: './reports-map.component.html',
  styleUrls: ['./reports-map.component.css'],
})
export class ReportsMapComponent implements OnInit {
  longitude = 17.189477703187666;
  latitude = 44.77066191443469;
  locations: ReportLocation[];
  blueMarker = {
    url: 'https://www.pinclipart.com/picdir/big/17-171343_maps-clipart-map-pin-google-maps-marker-blue.png',
    scaledSize: {
      width: 25,
      height: 45,
    },
  };
  yellowMarker = {
    url: 'https://www.pinclipart.com/picdir/big/525-5258227_google-map-marker-icon-png-clipart.png',
    scaledSize: {
      width: 25,
      height: 45,
    },
  };
  greenMarker = {
    url: 'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309741_960_720.png',
    scaledSize: {
      width: 25,
      height: 45,
    },
  };

  constructor(
    private reportLocation: ReportLocationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reportLocation.getReportsByLocation().subscribe((data) => {
      this.locations = data;
    });
    navigator.geolocation.getCurrentPosition(
      (resp) => {
        this.longitude = resp.coords.longitude;
        this.latitude = resp.coords.latitude;
      },
      () => {},
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }

  onMarkerClick(id: number) {
    this.router.navigate(['reports/' + id]);
  }
}
