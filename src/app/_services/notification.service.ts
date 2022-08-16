import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {
  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
  }

  showInfo(message: string) {
    this.messageService.add({severity: 'info', summary: 'Info', detail: message});
  }

  showWarn(message: string) {
    this.messageService.add({severity: 'warn', summary: 'Warn', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: message});
  }

  showTopLeft(message: string) {
    this.messageService.add({key: 'tl', severity: 'info', summary: 'Info', detail: message});
  }

  showTopCenter() {
    this.messageService.add({key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showBottomCenter() {
    this.messageService.add({key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed'
    });
  }

  showMultiple() {
    this.messageService.addAll([
      {severity: 'info', summary: 'Message 1', detail: 'Message Content'},
      {severity: 'info', summary: 'Message 2', detail: 'Message Content'},
      {severity: 'info', summary: 'Message 3', detail: 'Message Content'}
    ]);
  }

  showSticky() {
    this.messageService.add({severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
