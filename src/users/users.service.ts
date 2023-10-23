import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await hashPassword(createUserDto.password);
      const data = { ...createUserDto, password };
      const existedUser = await this.usersRepository.findOneBy({
        email: data.email,
      });

      if (existedUser) {
        return existedUser;
      }
      return await this.usersRepository.create(data).save();
    } catch (error) {
      throw new HttpException(
        'smmething went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    const users = this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('not found user', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existedUser = await this.usersRepository.findOneBy({ id });
    if (!existedUser) {
      throw new HttpException('not found user', HttpStatus.FORBIDDEN);
    }
    if (updateUserDto.password) {
      const password = await hashPassword(updateUserDto.password);
      updateUserDto.password = password;
    }
    const updateData = { ...existedUser, ...updateUserDto };
    await this.usersRepository.update({ id }, updateData);
    return {
      userId: id,
      status: 'was updated',
    };
  }

  async remove(id: number) {
    const existedUser = await this.usersRepository.findOneBy({ id });
    if (!existedUser) {
      throw new HttpException('not found user', HttpStatus.FORBIDDEN);
    }
    await this.usersRepository.softDelete({ id });
    return {
      userId: id,
      email: existedUser.email,
      status: 'was removed',
    };
  }
}
