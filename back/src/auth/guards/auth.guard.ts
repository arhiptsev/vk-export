import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
        private userService: UserService,
    ) {
        super();

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!await super.canActivate(context)) {
            return false;
        }
        const user = context.switchToHttp().getRequest().user;


        if (!await this.userService.checkUserExist(user.username)) {
            return false;
        }
        return true;
    }

    public handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
