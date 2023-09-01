import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf, type WithNullableKeys } from '~/libs/types/types.js';

import { type Prompt, type PromptType } from './libs/types/types.js';

type PromptEntityPayload = Omit<Prompt, 'id'>;

class PromptEntity implements IEntity {
  private 'id': number | null;
  private 'character': string | null;
  private 'setting': string | null;
  private 'situation': string | null;
  private 'prop': string | null;
  private 'type': ValueOf<typeof PromptType>;
  private 'genreId': number | null;

  private constructor({
    id,
    character,
    setting,
    situation,
    prop,
    type,
    genreId,
  }: WithNullableKeys<Prompt, 'id'>) {
    this.id = id;
    this.character = character;
    this.setting = setting;
    this.situation = situation;
    this.prop = prop;
    this.type = type;
    this.genreId = genreId;
  }

  public static initialize({
    id,
    character,
    setting,
    situation,
    prop,
    type,
    genreId,
  }: Prompt): PromptEntity {
    return new PromptEntity({
      id,
      character,
      setting,
      situation,
      prop,
      type,
      genreId,
    });
  }

  public static initializeNew({
    character,
    setting,
    situation,
    prop,
    type,
    genreId,
  }: PromptEntityPayload): PromptEntity {
    return new PromptEntity({
      id: null,
      character,
      setting,
      situation,
      prop,
      type,
      genreId,
    });
  }

  public toObject(): Prompt {
    return {
      id: this.id as number,
      character: this.character,
      setting: this.setting,
      situation: this.situation,
      prop: this.prop,
      type: this.type,
      genreId: this.genreId,
    };
  }

  public toNewObject(): PromptEntityPayload {
    return {
      character: this.character,
      setting: this.setting,
      situation: this.situation,
      prop: this.prop,
      type: this.type,
      genreId: this.genreId,
    };
  }
}

export { PromptEntity };
