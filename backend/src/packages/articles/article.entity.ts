import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import {
  type ArticleEntityType,
  type ArticleResponseDto,
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
  private 'coverId': number | null;
  private 'coverUrl'?: string | null;
  private 'publishedAt': string | null;
  private 'author'?: UserDetailsResponseDto;
  private 'prompt'?: ArticleWithRelationsType['prompt'];
  private 'genre'?: ArticleWithRelationsType['genre'];
  private 'reactions'?: ReactionResponseDto[];
  private 'readTime': number | null;

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
    reactions,
    prompt,
    genre,
    readTime,
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
    this.readTime = readTime;
    this.coverId = coverId;
    this.coverUrl = coverUrl;
  }

  public static initialize({
    id,
    title,
    text,
    userId,
    coverId,
    coverUrl,
    promptId,
    genreId,
    publishedAt,
    author,
    reactions,
    prompt,
    genre,
    readTime,
  }: ArticleWithRelationsType): ArticleEntity {
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
      author,
      reactions,
      prompt,
      genre,
      readTime,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    coverId,
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
      coverId,
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
      coverId: this.coverId,
      promptId: this.promptId,
      genreId: this.genreId,
      readTime: this.readTime,
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
      coverId: this.coverId,
      coverUrl: this.coverUrl as ArticleResponseDto['coverUrl'],
      publishedAt: this.publishedAt,
      author: this.author as UserDetailsResponseDto,
      reactions: this.reactions as ReactionResponseDto[],
      prompt: this.prompt as ArticleResponseDto['prompt'],
      genre: this.genre as ArticleResponseDto['genre'],
      readTime: this.readTime,
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
      readTime: this.readTime,
      publishedAt: this.publishedAt,
    };
  }
}

export { ArticleEntity };
