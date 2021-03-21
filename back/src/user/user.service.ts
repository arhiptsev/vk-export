import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { UserProfile } from './types/user-profile';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async addUser(userData: Partial<User>): Promise<any> {
    userData.password = hashSync(userData.password, 10);
    return this.userRepository.save(userData);
  }

  public findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  public updateById(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.userRepository.update(id, data);
  }

  public writeVkToken(id: number, token: string): Promise<UpdateResult> {
    return this.userRepository.update(id, { vk_token: token });
  }

  public getUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public getUserProfile(id: number): Observable<UserProfile> {
    return from(this.userRepository.findOne({ select: ['username', 'email'] }));
  }

  public async checkUserExist(username: string): Promise<boolean> {
    const res = await this.findByUsername(username);
    return !!res;
  }
}
