import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Course } from './models/course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(entity: DeepPartial<Course>): Promise<boolean> {
    const res = await this.courseRepository.save(
      this.courseRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Course> {
    return this.courseRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Course>): Promise<boolean> {
    const res = await this.courseRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findCourses({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Course>;
  }): Promise<[Course[], number]> {
    return this.courseRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
      where,
      relations: ['shop'],
    });
  }

  /**
   * 删除操作
   * @param id
   * @returns
   */
  async deleteById(id: string, userId: string): Promise<boolean> {
    const res = await this.courseRepository.update(id, {
      deletedBy: userId,
    });
    if (res) {
      const res1 = await this.courseRepository.softDelete(id);
      if (res1.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
