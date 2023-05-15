import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Message = {
  content: string;
};

@Injectable()
export class NotificationManager {
  private notifier$ = new Subject<Message>();

  traceError(message: string): void {
    this.notifier$.next({ content: message });
  }

  getNotifier(): Subject<Message> {
    return this.notifier$;
  }
}
