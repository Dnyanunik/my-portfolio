import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  // 1. Default Route: Load Home when URL is empty
  { path: '', component: Home },
  {path: 'skills', loadComponent: () => import('./components/skills/skills').then(m => m.Skills)},
  {path: 'about', loadComponent: () => import('./components/about/about').then(m => m.About)},
  {path: 'projects', loadComponent: () => import('./components/projects/projects').then(m => m.Projects)},
  {path: 'contact', loadComponent: () => import('./components/contact/contact').then(m => m.Contact)},
  // 2. Wildcard Route (Optional): Redirect any unknown paths back to Home
  { path: '**', redirectTo: '' }
];
