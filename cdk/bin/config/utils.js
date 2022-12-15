const ensureString = (object, propName) => {
  if (!object[`${propName}`]) {
    throw new Error(`${propName} does not exist`);
  }
  if (typeof object[`${propName}`] !== 'string') {
    throw new Error(`${propName} is not string`);
  }
  if (object[`${propName}`].trim().length === 0) {
    throw new Error(`${propName} is empty`);
  }

  return object[`${propName}`];
};

const ensureArrayString = (object, propName) => {
  if (!object[`${propName}`]) {
    throw new Error(`${propName} does not exist`);
  }
  if (!Array.isArray(object[`${propName}`])) {
    throw new Error(`${propName} is not array`);
  }

  object[`${propName}`].forEach((item) => {
    if (typeof item !== 'string') {
      throw new Error(`${item} from ${propName} is not string`);
    }
    if (item.trim().length === 0) {
      throw new Error(`${item} from ${propName} is empty`);
    }
  });

  return object[`${propName}`];
};

const ensureNumber = (object, propName) => {
  if (!object[`${propName}`]) {
    throw new Error(`${propName} does not exist`);
  }
  if (typeof object[`${propName}`] !== 'number') {
    throw new Error(`${propName} is not number`);
  }

  return object[`${propName}`];
};

module.exports = {
  ensureString,
  ensureArrayString,
  ensureNumber,
};
