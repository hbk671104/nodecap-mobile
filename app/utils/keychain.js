import { NativeModules } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Realm from 'realm';
import moment from 'moment';
import Base64 from 'base-64';
import 'core-js';

const HotnodeManager = NativeModules.HotnodeManager;

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

const config = { schema: [KeychainSchema] };

const base64StringToInt8Array = data => {
  return Int8Array.from(Base64.decode(data), c => c.charCodeAt(0));
};

export const initKeychain = async () => {
  let encryptionKey;
  const credential = await Keychain.getGenericPassword();
  if (credential) {
    encryptionKey = base64StringToInt8Array(credential.password);
  } else {
    const data = await HotnodeManager.randomBytes(64);
    encryptionKey = base64StringToInt8Array(data);
    await Keychain.setGenericPassword('encryptionKey', data);
  }

  global.encryptionKey = encryptionKey;
};

export const openRealm = () => {
  const realm = new Realm({ ...config, encryptionKey: global.encryptionKey });
  return realm;
};

export const addKeychain = (entry, callback) => {
  const realm = openRealm();
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
  const realm = openRealm();
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
  const realm = openRealm();
  realm.write(() => {
    realm.delete(item);
    if (callback) {
      callback();
    }
  });
};

export const getKeychain = () => {
  const realm = openRealm();
  return realm.objects('Keychain').sorted('created', true);
};

export const clearKeychain = async () => {
  await Keychain.resetGenericPassword();
  try {
    Realm.deleteFile({ ...config, encryptionKey: global.encryptionKey });
    global.encryptionKey = null;
  } catch (error) {
    console.log(error);
  }
};
