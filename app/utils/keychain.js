import Realm from 'realm';
import * as Keychain from 'react-native-keychain';
import moment from 'moment';

const KeychainSchema = {
  name: 'Keychain',
  properties: {
    type: 'string',
    created: 'string',
    name: 'string',
    lastSync: 'string?',
    address: 'string?',
    apiKey: 'string?',
    secretKey: 'string?',
  },
};

let realm;

export const initKeychain = () => {
  realm = new Realm({ schema: [KeychainSchema] });
};

export const addKeychain = (entry, callback) => {
  realm.write(() => {
    realm.create('Keychain', {
      ...entry,
      created: moment().format('YYYY/MM/DD HH:mm:ss'),
    });
    if (callback) {
      callback();
    }
  });
};

export const deleteKeychain = (created, callback) => {
  realm.write(() => {
    const key = realm.objects('Keychain').filtered(`created = "${created}"`);
    realm.delete(key);
    if (callback) {
      callback(getKeychain());
    }
  });
};

export const getKeychain = () => {
  return realm.objects('Keychain').sorted('created', true);
};

export const clearKeychain = () => {
  Realm.deleteFile({ schema: [KeychainSchema] });
  realm = null;
};
