import moment from 'moment';
import R from 'ramda';
import { getUploadToken } from './api';
import request from '../utils/request';
import Base64 from 'base-64';
import Config from 'react-native-config';

const typeDirMap = {
  whitepaper: 'whitepaper/',
  logo: 'logo/',
  avatar: 'avatar/',
  screenshot: 'screenshot/',
};

const tokenTemp = {};

async function UploadService(type) {
  if (tokenTemp[type]) {
    const policy = JSON.parse(Base64.decode(tokenTemp[type].policy));
    const inExpiration = moment(policy.expiration).isAfter(moment());
    if (inExpiration) {
      return tokenTemp[type];
    }
  }
  const res = await getUploadToken(R.pathOr('', [type])(typeDirMap));
  tokenTemp[type] = res.data;
  return res.data;
}

export function uploadToOSS({ host, form }) {
  return request.post(host, form);
}

/* eslint-disable */
function dataURLtoFile(dataurl, filename) {
  let bstr = Base64.decode(dataurl),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: 'image/*' });
}

export async function uploadImage({ image, type }) {
  const serverToken = await UploadService(type);
  const form = new FormData();
  const file = dataURLtoFile(image.data, image.fileName);
  form.append('key', `${type}/${file.size}${file.lastModified}-${file.name}`);
  R.mapObjIndexed((key, value) => form.append(value, key))(serverToken);
  form.append('OSSAccessKeyId', serverToken.accessid);
  form.append('file', file);
  try {
    await fetch(serverToken.host, {
      method: 'put',
      headers: {
        Authorization: `OSS ${serverToken.signature}`,
        'Content-Type': 'multipart/form-data',
      },
      body: form,
    });
    return {
      ...file,
      name: file.name,
      url: `${Config.CDN_URL}${type}/${file.size}${file.lastModified}-${
        file.name
      }`,
    };
  } catch (e) {
    console.log(`${file.name} 上传失败！`);
    throw new Error(e);
  }
}

export default UploadService;
