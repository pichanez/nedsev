import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

@Controller('/webhook')
export class WebhookController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postData(@Body() body) {
    return this.appService.getData(body);
  }
}
