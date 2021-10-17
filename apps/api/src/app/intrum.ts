import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class IntrumService {
  constructor(private http: HttpService) {}
}
