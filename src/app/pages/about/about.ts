import { RouterLink } from '@angular/router';
import { Component, AfterViewInit, OnDestroy, effect, input } from '@angular/core';
import * as L from 'leaflet';
import { TranslatePipe } from '../../pipes/translate-pipe-pipe';

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  


}
