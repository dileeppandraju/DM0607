import Realm from 'realm';
import { ConceptSchema, ActivitySchema, StageSchema, Question } from './models/schemas';

const schemaVersion = 1;

export const realmConfig = {
  path: 'default1.realm',  
  schema: [ConceptSchema, ActivitySchema, StageSchema, Question],
  schemaVersion: schemaVersion,
};

let realmInstance: Realm | null = null;

export const getRealmInstance = (): Realm => {
  if (!realmInstance) {
    realmInstance = new Realm(realmConfig);
  }
  return realmInstance;
};

export const closeRealmInstance = () => {
  if (realmInstance) {
    realmInstance.close();
    realmInstance = null;
  }
};
