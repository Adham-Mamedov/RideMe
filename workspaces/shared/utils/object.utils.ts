export const exclude = <T, Key extends keyof T>(
  model: T,
  keys: Key[]
): Omit<T, Key> => {
  for (let key of keys) {
    delete model[key];
  }
  return model;
};

export const excludeFromArray = <T, Key extends keyof T>(
  models: T[],
  keys: Key[]
): Omit<T[], Key> => {
  for (const model of models) {
    for (let key of keys) {
      delete model[key];
    }
  }
  return models;
};
