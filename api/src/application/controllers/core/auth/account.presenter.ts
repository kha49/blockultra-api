import { Min } from 'class-validator';
export class AuthPresenter {
  @Min(1)
  username: string = '';
  @Min(6)
  password: string = '';

  static presentItem(item: any) {
    return {
      id: item.id,
      username: item.username,
      full_name: item.full_name,
      group_ids: item.group_ids,
    };
  }
}
