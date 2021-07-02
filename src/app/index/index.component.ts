import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.LoadParticles();
  }

  public LoadParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }


}
