import { UserService } from "src/user/user.service";
import { Observable } from "rxjs";
import { HttpException, HttpStatus, HttpService, Injectable, Scope, UseGuards } from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse } from "src/export/types/api-response";
import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";

@UseGuards(AuthGuard('jwt'))
@Injectable({ scope: Scope.REQUEST })
export class VkRequestService {

  private apiUrl: string;
  private token: string;

  constructor(
    private userService: UserService,
    private http: HttpService,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.get('VK_API_URL');
  }


  public initAccessToken(userId: number): Promise<boolean> {
    return this.userService.getUserById(userId)
      .then(res => {
        if (!res.vk_token) {
          return false;
        }
        this.token = res.vk_token;
        return true;
      });
  }

  public sendRequest<T = any>(
    section: string,
    method: string,
    params: { [key: string]: string | number } = {}
  ): Observable<AxiosResponse<ApiResponse<T>>> {

    let requestUrl = `${this.apiUrl}/${section}.${method}`;
    let queryParams = {
      v: 5.101,
      access_token: this.token
    }
    if (params) {
      queryParams = Object.assign(queryParams, params);
    }
    return this.http.get<ApiResponse<T>>(requestUrl, { params: queryParams })
      .pipe(
        catchError(() => {
          throw new HttpException(
            { message: 'invalid_vk_token' },
            HttpStatus.BAD_REQUEST
          );
        })
      );
  }

}
