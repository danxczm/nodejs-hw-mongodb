// src/utils/parseFilterParams.js

const parseContactType = contactType => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = contactType => ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = value => {
  if (typeof value !== 'string') return;

  const normalized = value.trim().toLowerCase();

  if (normalized === 'true') return true;
  if (normalized === 'false') return false;

  return;
};

export const parseFilterParams = query => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
