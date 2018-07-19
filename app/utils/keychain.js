import * as Keychain from 'react-native-keychain';
import Realm from 'realm';
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
let encryptionKey;

export const initKeychain = async () => {
  const credential = await Keychain.getGenericPassword();
  if (credential) {
    encryptionKey = Int8Array.from(credential.password);
  } else {
    encryptionKey = new Int8Array(64);
    Keychain.setGenericPassword('encryptionKey', encryptionKey.join(''));
  }
  realm = await Realm.open({ schema: [KeychainSchema] });
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

export const clearKeychain = async callback => {
  await Keychain.resetGenericPassword();
  realm.write(() => {
    realm.deleteAll();
    if (callback) {
      callback();
    }
  });
};
