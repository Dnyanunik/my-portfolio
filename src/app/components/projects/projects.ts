import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as THREE from 'three';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class Projects implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  private platformId = inject(PLATFORM_ID);

projects = [
  {
    title: 'Shoe-Selling Android App',
    description: 'E-commerce platform with Java.',
    tech: ['Android', 'Java', 'Firebase'],
    icon: 'smartphone',
    color: '#ff8000',
    github: 'https://github.com/VivekJadhav07/SwiftWalk-E-commerce-Application-.git', // Yahan link daalo
    live: 'https://yourprojectlink.com'                // Yahan live demo link
  },
  {
    title: 'Health-Care Chatbot',
    description: 'AI assistant using JS and PHP.',
    tech: ['HTML', 'CSS', 'JS', 'PHP'],
    icon: 'forum',
    color: '#00d2ff',
    github: 'https://github.com/Dnyanunik/Healthcare-Chatbot-Website.git',
    live: 'https://dnyaneshwar-chatbot.rf.gd/'
  },
  {
    title: 'Serverless TTS System',
    description: 'Cloud-based speech synthesis.',
    tech: ['Python', 'Cloud', 'API'],
    icon: 'record_voice_over',
    color: '#ccff00',
    github: 'https://github.com/Dnyanunik/angular-polly-app.git',
    live: 'https://angular-polly-app.onrender.com/home'
  }
];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
  }

  private initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(15, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 35;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
