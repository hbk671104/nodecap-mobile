import moment from 'moment';
import * as R from 'ramda';
import { getUploadToken } from './api';
import request from '../utils/request';
import config from '../config';

const typeDirMap = {
  whitepaper: 'whitepaper/',
  logo: 'logo/',
  avatar: 'avatar/',
  screenshot: 'screenshot/',
};

const tokenTemp = {};

async function UploadService(type) {
  if (tokenTemp[type]) {
    const policy = JSON.parse(atob(tokenTemp[type].policy));
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


export async function uploadFiles({ fileList = [], type }) {
  const serverToken = await UploadService(type);
  return Promise.all(fileList.map(async (file) => {
    if (!(file instanceof File)) {
      return Promise.resolve(file);
    }
    const form = new FormData();
    form.append('key', `${type}/${file.size}${file.lastModified}-${file.name}`);
    R.mapObjIndexed((key, value) => form.append(value, key))(serverToken);
    form.append('OSSAccessKeyId', serverToken.accessid);
    form.append('file', file);
    try {
      await uploadToOSS({
        host: serverToken.host,
        form,
      });
      return {
        ...file,
        name: file.name,
        url: `${config.CDN_URL}${type}/${file.size}${file.lastModified}-${file.name}`,
      };
    } catch (e) {
      console.log(`${file.name} 上传失败！`);
      throw new Error(e);
    }
  }));
}

export default UploadService;
