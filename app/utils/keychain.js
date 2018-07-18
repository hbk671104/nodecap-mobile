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

export let realm;

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

export const updateKeychain = (item, payload, callback) => {
  const newItem = item;
  realm.write(() => {
    const { lastSync, address, apiKey, secretKey } = payload;
    if (lastSync) {
      newItem.lastSync = lastSync;
    }
    if (address) {
      newItem.address = address;
    }
    if (apiKey) {
      newItem.apiKey = apiKey;
    }
    if (secretKey) {
      newItem.secretKey = secretKey;
    }

    if (callback) {
      callback();
    }
  });
};

export const deleteKeychain = (item, callback) => {
  realm.write(() => {
    realm.delete(item);
    if (callback) {
      callback();
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
