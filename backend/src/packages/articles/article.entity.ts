import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import {
  type ArticleEntityType,
  type ArticleWithAuthorType,
  type UserDetailsResponseDto,
} from './libs/types/types.js';

class ArticleEntity implements IEntity {
  private 'id': number | null;
  private 'title': string;
  private 'text': string;
  private 'userId': number;
  private 'promptId': number | null;
  private 'genreId': number | null;
  private 'coverId': number | null;
  private 'coverUrl'?: string | null;
  private 'publishedAt': string | null;
  private 'author'?: UserDetailsResponseDto;
  private 'prompt'?: ArticleWithAuthorType['prompt'];
  private 'genre'?: ArticleWithAuthorType['genre'];

  private constructor({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    coverId,
    coverUrl,
    publishedAt,
    author,
    prompt,
    genre,
  }: WithNullableKeys<ArticleWithAuthorType, 'id'>) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.userId = userId;
    this.promptId = promptId;
    this.genreId = genreId;
    this.publishedAt = publishedAt;
    this.author = author;
    this.prompt = prompt;
    this.genre = genre;
    this.coverId = coverId;
    this.coverUrl = coverUrl;
  }

  public static initialize({
    id,
    title,
    text,
    userId,
    coverId,
    promptId,
    genreId,
    publishedAt,
  }: ArticleEntityType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      coverId,
      genreId,
      promptId,
      publishedAt,
    });
  }

  public static initializeWithAuthor({
    id,
    title,
    text,
    userId,
    coverId,
    promptId,
    genreId,
    publishedAt,
    coverUrl,
    author,
    prompt,
    genre,
  }: ArticleWithAuthorType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      coverId,
      coverUrl,
      promptId,
      genreId,
      publishedAt,
      author: {
        firstName: author?.firstName as string,
        lastName: author?.lastName as string,
      },
      prompt,
      genre,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    coverId,
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
      coverId,
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
      coverId: this.coverId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
    };
  }

  public toObjectWithAuthor(): ArticleWithAuthorType {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      coverId: this.coverId,
      coverUrl: this.coverUrl,
      publishedAt: this.publishedAt,
      author: this.author,
      prompt: this.prompt,
      genre: this.genre,
    };
  }

  public toNewObject(): Omit<ArticleEntityType, 'id'> {
    return {
      title: this.title,
      text: this.text,
      userId: this.userId,
      coverId: this.coverId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
    };
  }
}

export { ArticleEntity };
