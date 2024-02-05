import { IBaseService } from '../../../core/interfaces/core/base';
import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';

export abstract class BaseService<TEntity extends ObjectLiteral>
  implements IBaseService<TEntity>
{
  constructor(private readonly repository: Repository<TEntity>) {}

  async getQueryBuilder(alias?: string): Promise<any> {
    return this.repository.createQueryBuilder(alias);
  }

  async batchInsert(data: TEntity[], batchSize: number): Promise<void> {
    const batches = [];
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      batches.push(batch);
    }

    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const batch of batches) {
        await this.repository
          .createQueryBuilder()
          .insert()
          .values(batch)
          .execute();
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async create(entity: TEntity): Promise<any> {
    return await this.repository.save(entity as DeepPartial<TEntity>);
  }

  async findAll(): Promise<any> {
    return await this.repository.find();
  }

  async update(entity: TEntity): Promise<any> {
    return await this.repository.save(entity as DeepPartial<TEntity>);
  }

  async findOne(id: string): Promise<any> {
    return await this.repository.findOne(id);
  }

  async deletes(ids: number[]): Promise<any> {
    return await this.repository.delete(ids);
  }
}
