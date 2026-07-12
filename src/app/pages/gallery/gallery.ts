import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate-pipe-pipe';
import { LangService } from '../../services/lang-service';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {

  public langService = inject(LangService)

  public galleryItems = [
    { image: '/gallery2.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery3.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery4.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery5.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery6.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery7.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery8.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery9.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery10.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery11.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery12.webp', title: 'Syrnik', category: 'Desserts' },
    { image: '/gallery13.webp', title: 'Syrnik', category: 'Desserts' },
  ]

}
