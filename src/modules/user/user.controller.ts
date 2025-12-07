import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // @Get('/ping')
  // public ping() {
  //   return {
  //     status: 200,
  //     message: 'Pong!',
  //   };
  // }

  @Post()
  public create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
