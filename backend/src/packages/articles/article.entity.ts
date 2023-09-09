import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import {
  type ArticleEntityType,
  type ArticleWithRelationsType,
  type ReactionResponseDto,
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
  private 'reactions'?: ReactionResponseDto[];
  private 'prompt'?: ArticleWithRelationsType['prompt'];
  private 'genre'?: string;

  private constructor({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    author,
    reactions,
    prompt,
    genre,
  }: WithNullableKeys<ArticleWithRelationsType, 'id'>) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.userId = userId;
    this.promptId = promptId;
    this.genreId = genreId;
    this.publishedAt = publishedAt;
    this.author = author;
    this.reactions = reactions;
    this.prompt = prompt;
    this.genre = genre;
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

  public static initializeWithRelations({
    id,
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    author,
    reactions,
    prompt,
    genre,
  }: ArticleWithRelationsType): ArticleEntity {
    return new ArticleEntity({
      id,
      title,
      text,
      userId,
      promptId,
      genreId,
      publishedAt,
      reactions,
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

  public toObjectWithRelations(): ArticleWithRelationsType {
    return {
      id: this.id as number,
      title: this.title,
      text: this.text,
      userId: this.userId,
      promptId: this.promptId,
      genreId: this.genreId,
      publishedAt: this.publishedAt,
      author: this.author,
      reactions: this.reactions,
      prompt: this.prompt,
      genre: this.genre,
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
