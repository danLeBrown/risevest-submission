import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../../config/typeorm.config';
import { User } from './entity/user.enity';
import { CreateUserDto } from './dto/create-user.dto';

export class UsersService {
  constructor(
    private readonly userRepo: Repository<User> = AppDataSource.getRepository(
      User,
    ),
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findOneByOrFail(where: FindOptionsWhere<User>) {
    const user = await this.userRepo.findOne({ where });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
