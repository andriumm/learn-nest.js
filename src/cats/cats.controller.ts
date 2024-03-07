import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
@Controller('cats') // This is the required decorator to define a controller. 'cats' is the base route for this controller /cats
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post() // This is a POST route handler.
  @Header('Cache-Control', 'none') // To specify a custom response header
  @HttpCode(204) // To specify a custom status code
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return 'This action adds a new cat';
  }

  @Get() // This is a decorator to define a route handler. In this case the route to get the cats is /cats.
  async findAll(@Req() request: Request): Promise<Cat[]> {
    // The @Req() decorator is used to inject the Request object into the handler because sometimes we need to access to the request details.
    // 'This action returns all cats';
    return this.catsService.findAll();
  } // or it could be like:

  @Get()
  findAllTwo(@Query() query: any) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  // Routes with parameters should be declared after any static paths. This prevents the parameterized paths from intercepting traffic destined for the static paths.
  @Get()
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }
  @Get(':id')
  findOnePassingParamToken(@Param('id') id: string): string {
    // You can also pass in a particular parameter token to the decorator, in this case 'id' and then reference the route parameter directly by name in the method body.
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
