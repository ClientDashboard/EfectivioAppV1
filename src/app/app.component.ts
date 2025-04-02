import { Component, OnInit } from '@angular/core';
import { AccessibilityFixService } from './services/accessibility-fix.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private accessibilityFixService: AccessibilityFixService) {}

  ngOnInit() {
    this.accessibilityFixService.initialize();
  }
}