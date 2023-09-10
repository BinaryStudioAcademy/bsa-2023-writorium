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
  private 'publishedAt': string | null;
  private 'author'?: UserDetailsResponseDto;
  private 'prompt'?: ArticleWithAuthorType['prompt'];
  private 'genre'?: string;
  private 'readTime': number | null;

  private constructor({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    author,
    prompt,
    genre,
    readTime,
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
    this.readTime = readTime;
  }

  public static initialize({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    readTime,
  }: ArticleEntityType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
      readTime,
    });
  }

  public static initializeWithAuthor({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    author,
    prompt,
    genre,
    readTime,
  }: ArticleWithAuthorType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
      author: {
        firstName: author?.firstName as string,
        lastName: author?.lastName as string,
      },
      prompt,
      genre,
      readTime,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    promptId,
    genreId,
    readTime,
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
      readTime,
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
      readTime: this.readTime,
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
      publishedAt: this.publishedAt,
      author: this.author,
      prompt: this.prompt,
      genre: this.genre,
      readTime: this.readTime,
    };
  }

  public toNewObject(): Omit<ArticleEntityType, 'id'> {
    return {
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      readTime: this.readTime,
      publishedAt: this.publishedAt,
    };
  }
}

export { ArticleEntity };
