import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Details } from './pages/details/details';
import { AuthMain } from './components/authComponents/auth-main/auth-main';
import { Login } from './components/authComponents/login/login';
import { Register } from './components/authComponents/register/register';
import { ForgotPassword } from './components/authComponents/forgot-password/forgot-password';
import { VerifyEmail } from './components/authComponents/verify-email/verify-email';
import { UserPage } from './pages/user-page/user-page';
import { UserProfile } from './pages/user-profile/user-profile';
import { ResetPasswordPage } from './pages/reset-password-page/reset-password-page';
import { DeleteAcc } from './pages/delete-acc/delete-acc';
import { UserCart } from './pages/user-cart/user-cart';
import { ErrorPage } from './components/error-page/error-page';

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
    path: 'details/:id',
    component: Details,
  },
  {
    path: 'auth',
    component: AuthMain,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
      {
        path: 'verify/:email',
        component: VerifyEmail,
      },
    ],
  },
  {
    path: 'user',
    component: UserPage,
    children: [
      {
        path: 'profile',
        component: UserProfile,
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'reset-password',
        component: ResetPasswordPage,
      },
      {
        path: 'delete-account',
        component: DeleteAcc,
      },
    ],
  },
  {
    path: 'cart',
    component: UserCart,
  },
  {
    path: '**',
    component:ErrorPage
  }
];
