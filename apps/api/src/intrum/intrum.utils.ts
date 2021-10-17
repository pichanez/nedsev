export const pickProperties = (
  aObj: object,
  bObj: object,
  withValue: boolean = false
): any => {
  const result = {};
  Object.entries(aObj).forEach((entry) => {
    const [key, value] = entry;
    result[key] = withValue ? bObj[value].value : bObj[value];
  });
  return result;
};

export const processExtProperties = (props: object): object => {
  let result = {};
  Object.entries(props).forEach((prop) => {
    let [key, value] = prop;

    if (!isNaN(Number(value.id))) {
      value.id = Number(value.id);
    }

    if (!isNaN(Number(value.value))) {
      value.value = Number(value.value);
    }

    result[Number(key)] = value;
  });
  return props;
};
