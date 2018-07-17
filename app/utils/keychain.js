import Realm from 'realm';
import * as Keychain from 'react-native-keychain';

const KeychainSchema = {
  name: 'Keychain',
  properties: {
    type: 'string',
    address: { type: 'string', default: '0x000000' },
    api_key: { type: 'string', default: 'api' },
    secret_key: { type: 'string', default: 'secret' },
  },
};

let realm;

export const initKeychain = async () => {
  realm = await Realm.open({ schema: [KeychainSchema] });
};

export const setKeychain = entry => {
  realm.write(() => {
    realm.create('Keychain', {
      ...entry,
    });
  });
};

export const getKeychain = () => {
  const keychain = realm.objects('Keychain');
  return keychain;
};

export const clearKeychain = async () => {
  await Keychain.resetGenericPassword();
};
