import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Details } from './pages/details/details';
import { ErrorPage } from './components/error-page/error-page';
import { About } from './pages/about/about';
import { Gallery } from './pages/gallery/gallery';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'menu',
    component: Menu,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'gallery',
    component: Gallery,
  },
  {
    path: 'details/:id',
    component: Details,
  },
  {
    path: '**',
    component:ErrorPage
  }
];
