import { type IEntity } from '~/libs/interfaces/interfaces.js';

class FileEntity implements IEntity {
  private 'id': number | null;

  private 'url': string;

  private constructor({ id, url }: { id: number | null; url: string }) {
    this.id = id;
    this.url = url;
  }

  public static initialize({
    id,
    url,
  }: {
    id: number | null;
    url: string;
  }): FileEntity {
    return new FileEntity({
      id,
      url,
    });
  }

  public static initializeNew({ url }: { url: string }): FileEntity {
    return new FileEntity({
      id: null,
      url,
    });
  }

  public toObject(): {
    id: number;
    url: string;
  } {
    return {
      id: this.id as number,
      url: this.url,
    };
  }

  public toNewObject(): {
    url: string;
  } {
    return {
      url: this.url,
    };
  }
}

export { FileEntity };
