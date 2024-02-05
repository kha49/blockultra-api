import { ITagService } from '../../../core/interfaces/tag';

export class GetTagNameFlow {
  constructor(private readonly service: ITagService) {}

  async execute(tagIds: any) {
    if (!tagIds) {
      return [];
    }
    const query = await this.service.getQueryBuilder();
    query.where('id IN (:...tagIds)', { tagIds });
    query.select(['name']);
    const tags = await query.getRawMany();
    const tagNames = tags.map((c: any) => c.name);
    return tagNames;
  }
}

export default GetTagNameFlow;
