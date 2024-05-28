import { NgComponentOutlet } from '@angular/common';
import { Component, OnInit, Renderer2, Type } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Modal } from '@interfaces/modals.interfaces';
import CustomOverlayRef from '@model/custom-overlay-ref.model';

@Component({
  standalone: true,
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  imports: [MatIcon, NgComponentOutlet],
})
export default class OverlayComponent implements OnInit {
  content: Type<any> = this.customOverlayRef.content;
  inputData: Modal = { modalTitle: '', modalColor: 'blue' };

  constructor(
    private customOverlayRef: CustomOverlayRef<any, Modal>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.inputData = this.customOverlayRef.data;
    this.listenToEscKey();
  }

  private listenToEscKey(): void {
    if (
      this.inputData.hideCloseBtn === undefined ||
      this.inputData.hideCloseBtn === false
    ) {
      this.renderer.listen('window', 'keyup', (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          this.close();
        }
      });
    }
  }

  close(): void {
    this.customOverlayRef.close(null);
  }
}
