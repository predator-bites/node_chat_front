interface Param {
  key: string;
  value: string | null;
}

export const getNewParams = (
  params: Param[],
  prevParams: URLSearchParams | string = '',
) => {
  const newParams = new URLSearchParams(prevParams);

  params.forEach((param) => {
    if (param.value) {
      newParams.set(param.key, param.value);
    } else {
      newParams.delete(param.key);
    }
  });

  return newParams;
};
