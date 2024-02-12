import { Controller, Get } from '@nestjs/common';

@Controller('cats') // This is the required decorator to define a controller. 'cats' is the base route for this controller /cats
export class CatsController {
  @Get() // This is a decorator to define a route handler
  findAll(): string {
    return 'This action returns all cats';
  }
}
