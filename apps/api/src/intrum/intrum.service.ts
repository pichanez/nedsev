import { HttpService, Injectable } from '@nestjs/common';
import { first, map } from 'rxjs/operators';

@Injectable()
export class IntrumService {
  constructor(private http: HttpService) {}
  getManager(managerId) {
    return this.http
      .get('http://nedsev.intrumnet.com/sharedapi/worker/filter', {
        headers: {
          Accept: 'application/json',
        },
        params: {
          apikey: 'f4519d0cfcbd677d3f1aad74deae2494',
          'params[id]': managerId,
        },
      })
      .pipe(
        first(),
        map((response) => response.data)
      );
  }
}
