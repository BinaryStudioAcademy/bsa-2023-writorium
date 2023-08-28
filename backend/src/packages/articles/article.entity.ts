import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type ArticleEntityType } from './libs/types/types.js';

class ArticleEntity implements IEntity {
  private 'id': number | null;
  private 'title': string;
  private 'text': string;
  private 'userId': number;
  private 'promptId': number | null;
  private 'genreId': number;
  private 'publishedAt': string | null;

  private constructor({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
  }: WithNullableKeys<ArticleEntityType, 'id'>) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.userId = userId;
    this.promptId = promptId;
    this.genreId = genreId;
    this.publishedAt = publishedAt;
  }

  public static initialize({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
  }: ArticleEntityType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
  }: Omit<ArticleEntityType, 'id'>): ArticleEntity {
    return new ArticleEntity({
      id: null,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
    });
  }

  public toObject(): ArticleEntityType {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
    };
  }

  public toNewObject(): Omit<ArticleEntityType, 'id'> {
    return {
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
    };
  }
}

export { ArticleEntity };
