import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements AfterViewInit {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private particlesMaterial!: THREE.PointsMaterial;

  // Mouse tracking for 3D parallax
  private mouseX = 0;
  private mouseY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initThree();
      this.animate();
    }
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle Geometry
    const geo = new THREE.BufferGeometry();
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 1500 : 4000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.particlesMaterial = new THREE.PointsMaterial({ transparent: true });
    this.updateParticleTheme();

    this.particles = new THREE.Points(geo, this.particlesMaterial);
    this.scene.add(this.particles);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    if (this.particles) {
      // Automatic drift
      this.particles.rotation.y += 0.0008;

      // Mouse Parallax effect
      this.particles.position.x += (this.mouseX - this.particles.position.x) * 0.05;
      this.particles.position.y += (-this.mouseY - this.particles.position.y) * 0.05;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX - window.innerWidth / 2) / 100;
    this.mouseY = (event.clientY - window.innerHeight / 2) / 100;
  }

  public updateParticleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    if (this.particlesMaterial) {
      if (isDark) {
        this.particlesMaterial.color.setHex(0x00d2ff);
        this.particlesMaterial.opacity = 0.8;
        this.particlesMaterial.size = 0.025;
      } else {
        this.particlesMaterial.color.setHex(0x1e293b);
        this.particlesMaterial.opacity = 0.3;
        this.particlesMaterial.size = 0.04;
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
