import { Injectable, Type } from '@angular/core';
import { ModalComponent } from '@app/common/components/modal/modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private modalService: NgbModal) { }

    /**
     * Opens a modal dialog with the specified title and content
     * @param title The title to display in the modal header
     * @param content The content to display in the modal body
     * @returns A reference to the opened modal
     */
    openModal(title: string, content: string): NgbModalRef {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.content = content;
        return modalRef;
    }
}