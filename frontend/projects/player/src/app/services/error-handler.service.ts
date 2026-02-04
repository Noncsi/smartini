import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

enum Severity {
  error = 'error',
  warn = 'warn',
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private messageService = inject(MessageService);
  duration = 5000;

  showError(detail: string) {
    this.messageService.add({
      severity: Severity.error,
      summary: Severity.error.toUpperCase(),
      detail,
      life: this.duration,
    });
  }

  showWarning(detail: string) {
    this.messageService.add({
      severity: Severity.warn,
      summary: Severity.warn.toUpperCase(),
      detail,
      life: this.duration,
    });
  }
}
