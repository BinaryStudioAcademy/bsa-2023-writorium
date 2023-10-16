import { Storage } from './storage.package.js';

const storage = new Storage(window.localStorage);

export { storage };
export { StorageKey } from './libs/enums/enums.js';
export { type IStorage } from './libs/interfaces/interfaces.js';
