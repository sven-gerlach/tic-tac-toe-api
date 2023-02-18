import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  heartbeat(): string {
    return 'This route always returns a heartbeat with status 200 OK';
  }
}
