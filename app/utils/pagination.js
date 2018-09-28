import R from 'ramda';

export const paginate = (old, payload) => {
  const oldData = R.path(['data'])(old);
  const oldPagination = R.path(['pagination'])(old);
  const oldCurrent = R.path(['current'])(oldPagination);

  const newData = R.path(['data'])(payload);
  const newPagination = R.path(['pagination'])(payload);
  const newCurrent = R.path(['current'])(newPagination);
  if (newCurrent === 1 || !newCurrent) {
    return payload;
  }

  if (newCurrent - oldCurrent === 1) {
    return {
      ...payload,
      data: R.concat(oldData, newData),
    };
  }

  return old;
};
