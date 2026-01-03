import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private timeline: any; // Animation reference store karne ke liye

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Background Blob Animations
      gsap.to('.blob-1', { x: 40, y: 40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.blob-2', { x: -40, y: -40, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // 2. Entrance Animations for Content
      this.timeline = gsap.timeline();

      this.timeline.from('.info-card', {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.5"); // Starts slightly before info-cards finish
    }
  }

  ngOnDestroy() {
    // Page leave karte waqt animations kill karna memory management ke liye sahi hai
    if (isPlatformBrowser(this.platformId)) {
      gsap.killTweensOf('.blob-1');
      gsap.killTweensOf('.blob-2');
      if (this.timeline) this.timeline.kill();
    }
  }
}
