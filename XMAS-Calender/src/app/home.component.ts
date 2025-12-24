import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="snow" aria-hidden></div>
      <header class="header">
        <h1>Für dich — ein kleines Weihnachtsgeschenk 🎄</h1>
        <p class="sub">Drei Türchen. Drei Überraschungen. Viel Liebe.</p>
      </header>

      <main class="grid">
        <div
          class="box"
          *ngFor="let box of boxes"
          [class.opening]="openingId === box.id"
          (click)="openBox(box.id)"
          role="button"
          tabindex="0"
          (keydown.enter)="openBox(box.id)"
        >
          <div class="ribbon"></div>
          <div class="lid">
            <div class="heart">❤</div>
          </div>
          <div class="label">{{ box.label }}</div>
        </div>
      </main>

      <footer class="foot"> ✨</footer>
    </div>
  `,
  styles: [
    `
    :host { display: block; }
    .page { min-height:100vh; display:flex; flex-direction:column; align-items:center; padding:2rem; linear-gradient(#072a12 0%, #0b3b22 60%, #f8f3ec 100%); color: #fff; font-family: Inter, system-ui, sans-serif; background}
    .header { text-align:center; margin-bottom:1.5rem; }
    .header h1 { margin:0; font-size:1.8rem; color:#ffeee6; text-shadow: 0 2px 6px rgba(0,0,0,0.5); }
    .sub { margin-top:0.25rem; color:#ffe8d6; }
    .grid { display:flex; gap:1rem; align-items:center; justify-content:center; width:100%; max-width:900px; }
    .box { width:180px; height:220px; background: linear-gradient(180deg,#b3272b,#871a20); border-radius:16px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); position:relative; cursor:pointer; transform-origin: top center; transition: transform 0.45s ease, box-shadow 0.25s ease; overflow:visible; border: 2px solid rgba(255,255,255,0.06);
      display:flex; align-items:flex-end; justify-content:center; }
    .box:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 14px 40px rgba(0,0,0,0.6); }
    .ribbon { position:absolute; width:100%; height:20px; top:40%; background: linear-gradient(90deg,#ffd27a,#ff7a7a); border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.4); transform:translateY(-50%); opacity:0.95 }
    .lid { position:absolute; top:-10px; left:10px; right:10px; height:70px; background: linear-gradient(180deg,#e8c49a 0%, #d99a7a 100%); border-radius:12px 12px 8px 8px; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(0,0,0,0.45); transform-origin: top center; transition: transform 0.6s cubic-bezier(.16,.84,.35,1), opacity 0.4s; }
    .heart { font-size:1.6rem; color:#9b0a10; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.45)); }
    .label { padding:1rem; color:#fff3ea; font-weight:600; text-align:center; }
    .box.opening .lid { transform: rotateX(-80deg) translateY(-10px) scale(0.98); opacity:0; }
    .box.opening { transform: scale(1.03); }
    .foot { margin-top:2rem; color:#fff0ea; }

    /* responsive */
    @media (max-width:640px){ .grid{flex-direction:row; gap:0.6rem} .box{width:120px;height:160px} }
    `
  ]
})
export class HomeComponent {
  openingId: string | null = null;
  boxes = [
    { id: '1', label: 'Türchen 1' },
    { id: '2', label: 'Türchen 2' },
    { id: '3', label: 'Türchen 3' }
  ];

  constructor(private router: Router) {}

  openBox(id: string) {
    if (this.openingId) return; // avoid double
    this.openingId = id;
    // wait for the opening animation then navigate
    setTimeout(() => {
      this.router.navigate(['/gift', id]);
    }, 650);
  }
}
