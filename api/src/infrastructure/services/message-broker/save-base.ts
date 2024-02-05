import {
  EntityManager,
  Repository,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm';

export class SaveBase<T extends ObjectLiteral> {
  private readonly repository: Repository<T>;

  constructor(private readonly em: EntityManager, entity: EntityTarget<T>) {
    this.repository = this.em.getRepository(entity);
  }

  async execute(
    datas: any,
    uniqueId: string,
    statusField?: string,
  ): Promise<any> {
    const batchSize = 1000;
    const totalRecords = datas.length;

    for (let i = 0; i < totalRecords; i += batchSize) {
      const batch = datas.slice(i, i + batchSize);

      const entities: any = [];
      batch.forEach((c: any) => {
        entities.push(c);
        this.repository.create(c);
      });

      let fieldsToUpdate;
      if (statusField) {
        fieldsToUpdate = Object.keys(entities[0]).filter(
          (field) => field !== uniqueId && field !== statusField,
        );
      } else {
        fieldsToUpdate = Object.keys(entities[0]).filter(
          (field) => field !== uniqueId,
        );
      }

      const insertQueryBuilder = this.repository
        .createQueryBuilder()
        .insert()
        .into(this.repository.target as string)
        .values(entities);

      const updateSetStatements = fieldsToUpdate.map(
        (column) => `"${column}" = EXCLUDED."${column}"`,
      );

      if(statusField){
        if (entities[0].hasOwnProperty(statusField)) {
          updateSetStatements.push(
            `"${statusField}" = EXCLUDED."${statusField}"`,
          );
        }
      }

      const conflictQuery = updateSetStatements.join(', ');

      try {
        if(statusField){
          await insertQueryBuilder
          .onConflict(
            `("${uniqueId}", "${statusField}") DO UPDATE SET ${conflictQuery}`,
          )
          .execute();
        }else {
          await insertQueryBuilder
          .onConflict(
            `("${uniqueId}") DO UPDATE SET ${conflictQuery}`,
          )
          .execute();
        }

        console.log(`Batch ${i / batchSize + 1} of entities inserted`);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
