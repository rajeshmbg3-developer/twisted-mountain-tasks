import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [NgbModalConfig, NgbModal, NgbActiveModal]
})
export class ModalComponent {
  @Input() title!: string;
  @Input() content!: string;

  constructor(private ngbModal: NgbModal) { }

  ngOnInit(): void {
    if (!this.title) this.title = 'Information';
    if (!this.content) this.content = 'No content provided';
  }

  close(): void {
    this.ngbModal.dismissAll();
  }
}
