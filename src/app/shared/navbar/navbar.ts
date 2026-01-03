import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
// Ensure the path to your service is correct
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements AfterViewInit, OnDestroy {
  @ViewChild('avatarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private avatarGroup!: THREE.Group;
  private animationId!: number;

  // FIX: Inject the service here so 'this.theme' works
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public theme: Theme
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAvatar();
      this.animate();
    }
  }

  private initAvatar() {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();

    // Camera adjusted for a better view of the full head
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.z = 3.2;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    // Grouping parts so they rotate together
    this.avatarGroup = new THREE.Group();

    // 1. Head
    const headGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf1c27d });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    this.avatarGroup.add(headMesh);

    // 2. Hair (Dark Cap)
    const hairGeo = new THREE.SphereGeometry(0.82, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.rotation.x = -0.3;
    this.avatarGroup.add(hairMesh);

    // 3. Eyes
    const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.25, 0.1, 0.73);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.25, 0.1, 0.73);
    this.avatarGroup.add(leftEye, rightEye);

    this.scene.add(this.avatarGroup);

    // Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 2, 5);
    this.scene.add(dirLight, new THREE.AmbientLight(0xffffff, 0.5));
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    if (this.avatarGroup) {
      this.avatarGroup.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);
  };

  toggleMode() {
    this.theme.toggleTheme();
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationId);
      this.renderer?.dispose();
    }
  }
}
