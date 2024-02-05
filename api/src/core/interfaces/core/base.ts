export interface IBaseService<T> {
  batchInsert(entities: T[], batchSize: number): Promise<any>;
  getQueryBuilder(alias?: string): Promise<any>;
  findAll(): Promise<any>;
  create(entity: T): Promise<any>;
  update(entity: T): Promise<any>;
  findOne(id: string): Promise<any>;
  deletes(ids: number[]): Promise<any>;
}
