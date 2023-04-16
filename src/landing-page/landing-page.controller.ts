import { Body, Controller, Post } from '@nestjs/common';
import { LandingPageService } from './landing-page.service';

@Controller('landing-page')
export class LandingPageController {
  constructor(private landingPageService: LandingPageService) {
    //
  }

  @Post('saveForm')
  saveForm(@Body() formData: any) {
    return this.landingPageService.addFormData(formData);
  }

  @Post('saveEmail')
  saveEmail(@Body() data: any) {
    console.log(data);
    return this.landingPageService.addEmail(data.email);
  }
}
