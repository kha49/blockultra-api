import { Min } from 'class-validator';
export class CrudUserPresenter {
  @Min(1)
  username: string = '';
  limit: number = 0;
  page: number = 0;

  static presentList(data: any) {
    const newData = data.map((i: any) => {
      const item = CrudUserPresenter.presentItem(i);
      return item;
    });
    return newData;
  }

  static presentItem(item: any) {
    const result = {
      id: item.id,
      email: item.email,
      username: item.username,
      firstName: item.firstName,
      last_name: item.lastName,
      role_ids: item.role_ids,
    };
    return result;
  }
}
