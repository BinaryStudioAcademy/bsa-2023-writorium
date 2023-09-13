import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import {
  type ArticleCommentCount,
  type ArticleEntityType,
  type ArticleResponseDto,
  type ArticleWithCommentCountResponseDto,
  type ArticleWithRelationsType,
} from './libs/types/types.js';

class ArticleEntity implements IEntity {
  private 'id': number | null;
  private 'title': string;
  private 'text': string;
  private 'userId': number;
  private 'promptId': number | null;
  private 'genreId': number | null;
  private 'publishedAt': string | null;
  private 'author': ArticleWithRelationsType['author'] | null;
  private 'prompt': ArticleWithRelationsType['prompt'];
  private 'genre': ArticleWithRelationsType['genre'];
  private 'commentCount': number | null;

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
    commentCount,
  }: WithNullableKeys<
    ArticleWithRelationsType & ArticleCommentCount,
    'id' | 'author' | 'commentCount'
  >) {
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
    this.commentCount = commentCount;
  }

  public static initialize({
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
    commentCount,
  }: ArticleWithRelationsType &
    WithNullableKeys<ArticleCommentCount, 'commentCount'>): ArticleEntity {
    return new ArticleEntity({
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
      commentCount,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
  }: Omit<
    ArticleWithRelationsType,
    'id' | 'author' | 'prompt' | 'genre'
  >): ArticleEntity {
    return new ArticleEntity({
      id: null,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
      commentCount: null,
      author: null,
      prompt: null,
      genre: null,
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

  public toObjectWithRelations(): ArticleResponseDto {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
      author: this.author as ArticleWithRelationsType['author'],
      prompt: this.prompt,
      genre: this.genre,
    };
  }

  public toObjectWithRelationsAndCommentCount(): ArticleWithCommentCountResponseDto {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
      author: this.author as ArticleWithRelationsType['author'],
      prompt: this.prompt,
      genre: this.genre,
      commentCount: Number(this.commentCount as number),
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
