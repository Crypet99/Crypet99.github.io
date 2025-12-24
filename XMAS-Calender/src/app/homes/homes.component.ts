import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="snow" aria-hidden></div>
      <header class="header">
        <h1>Leider nichts gekauft.. mhh dann einfach auf meine Art🎄</h1>
        <p class="sub">Drei Türchen. Drei Überraschungen. Deine Entscheidung.</p>
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
    </div>
  `,
  styles: [
    `
    :host { display:block }
    /* dark, elegant background */
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.25rem;
  background-image: url("/her.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Inter, system-ui, sans-serif;
  overflow: hidden;
}

/* Blur Layer */
.page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  background-repeat: inherit;
  filter: blur(50px);
  transform: scale(1.08); /* verhindert Blur-Ränder */
  z-index: 0;
}

/* Inhalt wieder scharf */
.page > * {
  position: relative;
  z-index: 1;
}
    .header { text-align:center; margin-bottom:1.5rem; }
    .header h1 { margin:0; font-size:1.6rem; color:#f8f9fa; font-weight:600; }
    .sub { margin-top:0.35rem; color:#cbd5db; font-size:0.95rem }


    /* grid with clear spacing */
    .grid { display:flex; gap:1.25rem; align-items:center; justify-content:center; width:100%; max-width:980px; }

    /* warm, clear door boxes */
    .box { width:180px; height:220px; background: linear-gradient(180deg,#b77a3b 0%, #9b5c2e 100%); border-radius:12px; box-shadow: 0 12px 40px rgba(0,0,0,0.7), inset 0 -6px 18px rgba(255,240,220,0.06); position:relative; cursor:pointer; transform-origin: top center; transition: transform 0.45s ease, box-shadow 0.25s ease; display:flex; align-items:center; justify-content:center; color:#fff; overflow:visible; border:1px solid rgba(255,255,255,0.04); }
    .box:focus { outline: 3px solid rgba(255,200,120,0.12); outline-offset:4px }
    .box:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 50px rgba(0,0,0,0.75); }

    /* lid as thin top flap */
    .lid { position:absolute; top:-10px; left:8px; right:8px; height:64px; background: linear-gradient(180deg,#ffdca8 0%, #e7b57b 100%); border-radius:10px 10px 6px 6px; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 18px rgba(0,0,0,0.5); transform-origin: top center; transition: transform 0.55s cubic-bezier(.16,.84,.35,1), opacity 0.35s; }
    .label { padding:1rem; color:#fffef8; font-weight:700; letter-spacing:0.02em; text-align:center; }
    .box.opening .lid { transform: rotateX(-82deg) translateY(-8px); opacity:0; }
    .box.opening { transform: scale(1.03); }

    /* subtle heart/ornament */
    .heart { font-size:1.4rem; color:rgba(255,255,255,0.9); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6)); }

    @media (max-width:640px){ .grid{flex-direction:row; gap:0.6rem} .box{width:126px;height:160px} }
    `
  ]
})
export class HomesComponent {
  boxes = [
    { id: '1', label: ' 1' },
    { id: '2', label: ' 2' },
    { id: '3', label: ' 3' }
  ];
  openingId: string | null = null;
  constructor(private router: Router) {}
  openBox(id: string) {
    if (this.openingId) return;
    this.openingId = id;
    setTimeout(() => {
      this.router.navigate(['/gift', id]);
    }, 650);
  }
}
