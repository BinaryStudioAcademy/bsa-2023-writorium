import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class ArticleModel extends AbstractModel {
  public 'title': string;
  public 'text': string;
  public 'userId': number;
  public 'promptId': number | null;
  public 'genreId': number;
  public 'publishedAt': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.ARTICLES;
  }
}

export { ArticleModel };
