import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import emailjs from '@emailjs/browser';       // 2. Import EmailJS
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule], // 3. Add to imports
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  // 4. Form Data Object
  formData = {
    from_name: '',
    reply_to: '',
    message: ''
  };

  // 5. Send Email Function
  async sendEmail(e: Event) {
    e.preventDefault();

    try {
      // Replace these IDs with your actual EmailJS credentials
      await emailjs.send(
        'service_nvndzz8',
        'template_phwvnol',
        {
          from_name: this.formData.from_name,
          to_name: 'Dnyaneshwar', // Your name
          message: this.formData.message,
          reply_to: this.formData.reply_to,
        },
        'FYilmjOcKzksZF_GH'
      );

      alert('Message sent successfully!');
      this.formData = { from_name: '', reply_to: '', message: '' }; // Reset form
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to('.blob-1', { x: 40, y: 40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.blob-2', { x: -40, y: -40, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.killTweensOf('.blob-1, .blob-2');
    }
  }
}
