import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { PromptEntity } from './prompt.entity.js';
import { type PromptModel } from './prompt.model.js';

class PromptRepository implements IRepository {
  private promptModel: typeof PromptModel;

  public constructor(promptModel: typeof PromptModel) {
    this.promptModel = promptModel;
  }

  public async find(id: number): Promise<PromptEntity | null> {
    const prompt = await this.promptModel.query().findById(id).execute();

    if (!prompt) {
      return null;
    }

    return PromptEntity.initialize(prompt);
  }

  public findAll(): ReturnType<IRepository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: PromptEntity): Promise<PromptEntity> {
    const { character, setting, situation, prop, type, genreId } =
      entity.toNewObject();

    const item = await this.promptModel
      .query()
      .insert({
        character,
        setting,
        situation,
        prop,
        type,
        genreId,
      })
      .returning('*')
      .execute();

    return PromptEntity.initialize(item);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { PromptRepository };
