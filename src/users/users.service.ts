import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDTO): Promise<User> {
    const user = await this.getOneUser(id);
    const isAlreadyExists = this.getUserByEmail(dto.email);

    if (isAlreadyExists) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    return await this.userRepository.save({
      ...user,
      ...dto,
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneUser(id);
    return await this.userRepository.remove(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
