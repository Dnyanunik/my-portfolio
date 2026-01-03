import { Component, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills implements AfterViewInit {
  private themeService = inject(Theme);
  private platformId = inject(PLATFORM_ID);
  selectedSkill: any = null;

  skillCategories = [
    {
      id: 'fe',
      name: 'FRONTEND',
      color: '#ccff00',
      img: 'assets/images/frontend.png',
      subItems: ['assets/images/angular.png', 'assets/images/typescript.png', 'assets/images/three.png', 'assets/images/scss.png']
    },
    {
      id: 'be',
      name: 'BACKEND',
      color: '#00d2ff',
      img: 'assets/images/backend.png',
      subItems: ['assets/images/nodejs.png', 'assets/images/mongodb.png', 'assets/images/sql.png']
    },
    {
      id: 'tl',
      name: 'TOOLS',
      color: '#ff6b00',
      img: 'assets/images/tools.png',
      subItems: ['assets/images/git.png', 'assets/images/docker.png', 'assets/images/figma.png']
    }
  ];

  openSkill(skill: any) {
    this.selectedSkill = skill;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeSkill() {
    this.selectedSkill = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Background movement matching global theme vibes
      gsap.to('.blob-1', { x: 50, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.blob-2', { x: -50, y: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }
}
