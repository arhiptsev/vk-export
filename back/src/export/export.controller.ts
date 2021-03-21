import { Controller, Get, UseGuards, HttpStatus, Body, Post, Req, Param, HttpException, HttpCode } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { VkLoginData } from './validators/vk-login-data';
import { ExportService } from './services/export.service';
import { switchMap, catchError } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { VkGuard } from './guards/vk.guard';
import { responseVkMessage } from 'src/export/types/response-vk-messages';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('export')
export class ExportController {

  constructor(
    private userService: UserService,
    private exportService: ExportService,
  ) { }

  @Get('messages')
  @UseGuards(VkGuard)
  public vkProfile(): Observable<responseVkMessage[]> {
    return this.exportService.getVkInfo();
  }

  @Get('dialog/:id/photos')
  @UseGuards(VkGuard)
  public getDialogPhotos(@Param('id') id: number): Observable<string[]> {
    return this.exportService.getAllPhotoUrls(id);
  }

  @Get('dialog/:id/videos')
  @UseGuards(VkGuard)
  public getDialogVideos(@Param('id') id: number): Observable<string[]> {
    return this.exportService.getAllPhotoUrls(id);
  }

  @Post('login')
  public login(@Req() req, @Body() vkLoginData: VkLoginData): Observable<any> {
    const { username, password, code } = vkLoginData;
    return this.exportService.vkLogin(username, password, code)
      .pipe(
        switchMap(res => {
          return from(
            this.userService.writeVkToken(req.user.userId, res.data.access_token)
          );
        }),
        catchError(err => {
          throw new HttpException(err.response.data, HttpStatus.BAD_REQUEST);
        })
      );

  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() req): Promise<void> {
    await this.userService.writeVkToken(req.user.userId, null);
  }
}
