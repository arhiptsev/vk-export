import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Observable, from } from 'rxjs';
import { UserProfile } from './types/user-profile';
import { ApiBody } from '@nestjs/swagger';


@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('registration')
  @ApiBody({ type: User })
  public async registration(@Body() userData: Partial<User>): Promise<void> {
    return await this.userService.addUser(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req): Observable<UserProfile> {
    return from(this.userService.getUserById(req.user.userId));
  }
}
