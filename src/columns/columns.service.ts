import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Colum } from './columns.entity';
import { CreateColumnDTO } from './dto/create-column.dto';
import { UpdateColumnDTO } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Colum) private columnsRepository: Repository<Colum>,
    private usersService: UsersService,
  ) {}

  async createColumn(user_id: number, dto: CreateColumnDTO): Promise<Colum> {
    await this.usersService.getOneUser(user_id);

    const column = this.columnsRepository.create({
      userId: user_id,
      ...dto,
    });

    return await this.columnsRepository.save(column);
  }

  async getAllColumns(user_id: number): Promise<Colum[]> {
    await this.usersService.getOneUser(user_id);
    const columns = await this.columnsRepository.find({
      where: { userId: user_id },
    });
    return columns;
  }

  async getOneColumn(id: number, user_id: number): Promise<Colum> {
    const column = await this.columnsRepository.findOne({
      where: { userId: user_id, id: id },
    });

    if (!column) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return column;
  }

  async updateColumn(
    user_id: number,
    id: number,
    dto: UpdateColumnDTO,
  ): Promise<Colum> {
    const column = await this.getOneColumn(id, user_id);
    return await this.columnsRepository.save({
      ...column,
      ...dto,
    });
  }

  async deleteColumn(user_id: number, id: number): Promise<Colum> {
    const column = await this.getOneColumn(id, user_id);
    return await this.columnsRepository.remove(column);
  }
}
