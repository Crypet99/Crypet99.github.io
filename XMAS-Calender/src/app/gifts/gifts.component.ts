import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GIFTS } from '../gifts.data';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wrap">
      <div class="snow" aria-hidden></div>
      <button class="back" (click)="goBack()">← Zurück</button>
      <div class="card" [class.revealed]="revealed">
        <img class="hero" [src]="gift.image" alt="Geschenk-Bild" />
        <div class="content">
          <h2>{{ gift.title }}</h2>
          <p class="msg">{{ gift.message }}</p>
          <a class="action" [routerLink]="['/']">Noch ein Türchen öffnen</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host{display:block}
.wrap {
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url("/her.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow: hidden;
}

/* Blur-Hintergrund */
.wrap::before {
  content: "";
  position: absolute;
  inset: 0;

  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  background-repeat: inherit;

  filter: blur(50px);
  transform: scale(1.15); /* verhindert harte Blur-Ränder */
  z-index: 0;
}

/* dunkles Overlay für Tiefe */
.wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
}

/* Inhalt bleibt scharf */
.wrap > * {
  position: relative;
  z-index: 1;
}
    .back{align-self:flex-start;background:transparent;border:0;color:#e8e8e8;padding:0.4rem 0.6rem;border-radius:10px;cursor:pointer}
    .card{width:100%;max-width:860px;background:linear-gradient(180deg,#08121a,#0b1a1f);border-radius:16px;box-shadow:0 26px 70px rgba(0,0,0,0.7);overflow:hidden;display:flex;gap:1rem;align-items:stretch;transform:translateY(18px) scale(.98);opacity:0;transition:all 600ms cubic-bezier(.16,.84,.35,1);border:1px solid rgba(255,255,255,0.03)}
    .card.revealed{transform:translateY(0) scale(1);opacity:1}
    .hero{width:40%;object-fit:cover;height:100%;min-height:240px;filter:grayscale(0.02) contrast(0.95)}
    .content{padding:1.25rem 1.5rem;display:flex;flex-direction:column;justify-content:center;color:#f3efe8}
    .content h2{margin:0 0 .6rem 0;color:#ffd9a8}
    .msg{margin:0 0 1rem 0;color:#dbe6ea}
    .action{color:#fff;background:linear-gradient(90deg,#b77a3b,#d49a61);padding:.5rem .8rem;border-radius:10px;text-decoration:none;display:inline-block}

    /* snowfall overlay for the gift view */
    .snow{position:fixed;inset:0;pointer-events:none}
    .snow::before, .snow::after { content:''; position:absolute; inset:0; background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 1px, transparent 2px); background-repeat: repeat; animation: fall 22s linear infinite; opacity:0.8 }

    @keyframes fall { from { transform: translateY(-20%); } to { transform: translateY(110%); } }

    @media (max-width:760px){.card{flex-direction:column}.hero{width:100%;height:220px}.content{width:100;padding:1rem}}
    `
  ]
})
export class GiftsComponent {
  gift = GIFTS[0];
  revealed = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '1';
    const found = GIFTS.find(g => g.id === id);
    this.gift = found ?? GIFTS[0];
    setTimeout(() => (this.revealed = true), 80);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
