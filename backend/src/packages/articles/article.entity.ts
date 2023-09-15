import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import {
  type ArticleCommentCount,
  type ArticleEntityType,
  type ArticleResponseDto,
  type ArticleWithCommentCountResponseDto,
  type ArticleWithRelationsType,
  type ReactionResponseDto,
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
  private 'author': ArticleWithRelationsType['author'] | null;
  private 'prompt': ArticleWithRelationsType['prompt'];
  private 'genre': ArticleWithRelationsType['genre'];
  private 'commentCount': number | null;
  private 'reactions': ReactionResponseDto[] | null;
  private 'readTime': number | null;
  private 'deletedAt': string | null;

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
    deletedAt,
    readTime,
    commentCount,
  }: WithNullableKeys<
    ArticleWithRelationsType & ArticleCommentCount,
    'id' | 'author' | 'commentCount' | 'reactions' | 'deletedAt'
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
    this.reactions = reactions;
    this.readTime = readTime;
    this.coverId = coverId;
    this.coverUrl = coverUrl;
    this.deletedAt = deletedAt;
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
    coverId,
    coverUrl,
    reactions,
    deletedAt,
    readTime,
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
      coverId,
      coverUrl,
      reactions,
      deletedAt,
      readTime,
    });
  }

  public static initializeNew({
    title,
    text,
    userId,
    promptId,
    genreId,
    publishedAt,
    coverId,
    readTime,
  }: Omit<
    ArticleWithRelationsType,
    | 'id'
    | 'author'
    | 'prompt'
    | 'genre'
    | 'reactions'
    | 'coverUrl'
    | 'deletedAt'
  >): ArticleEntity {
    return new ArticleEntity({
      id: null,
      title,
      text,
      userId,
      promptId,
      genreId,
      coverId,
      publishedAt,
      commentCount: null,
      author: null,
      prompt: null,
      genre: null,
      coverUrl: null,
      reactions: null,
      deletedAt: null,
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
      deletedAt: this.deletedAt,
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
      author: this.author as ArticleWithRelationsType['author'],
      reactions: this.reactions as ReactionResponseDto[],
      prompt: this.prompt,
      genre: this.genre,
      readTime: this.readTime,
      deletedAt: this.deletedAt,
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
      coverId: this.coverId,
      coverUrl: this.coverUrl as ArticleResponseDto['coverUrl'],
      publishedAt: this.publishedAt,
      author: this.author as ArticleWithRelationsType['author'],
      prompt: this.prompt,
      genre: this.genre,
      readTime: this.readTime,
      reactions: this.reactions as ReactionResponseDto[],
      commentCount: Number(this.commentCount as number),
      deletedAt: this.deletedAt,
    };
  }

  public toNewObject(): Omit<ArticleEntityType, 'id' | 'updatedAt'> {
    return {
      title: this.title,
      text: this.text,
      userId: this.userId,
      coverId: this.coverId,
      promptId: this.promptId,
      genreId: this.genreId,
      readTime: this.readTime,
      publishedAt: this.publishedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export { ArticleEntity };
