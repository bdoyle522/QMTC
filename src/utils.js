import {
  stringOperators,
  integersOperators,
  USER_EMAIL,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  VISITS,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  PAGE_RESPONSE,
  DOMAIN,
  PATH,
  NUMBER,
  TEXT,
  BETWEEN,
  CONTAINS,
  IN,
  STARTS_WITH,
} from './constants';

export const getPredicateOperators = (predicate) => {
  return getTypeOfPredicate(predicate) === NUMBER
    ? integersOperators
    : stringOperators;
};

export const getTypeOfPredicate = (predicate) => {
  switch (predicate) {
    case SCREEN_WIDTH:
    case SCREEN_HEIGHT:
    case VISITS:
    case PAGE_RESPONSE:
      return NUMBER;
    case USER_EMAIL:
    case USER_FIRST_NAME:
    case USER_LAST_NAME:
    case DOMAIN:
    case PATH:
    default:
      return TEXT;
  }
};

export const generatePlaceholderText = (predicate) => {
  switch (predicate) {
    case SCREEN_WIDTH:
      return 100;
    case SCREEN_HEIGHT:
      return 100;
    case VISITS:
      return 6;
    case PAGE_RESPONSE:
      return 46;
    case USER_EMAIL:
      return 'johnnydoe@gmail.com';
    case USER_FIRST_NAME:
      return 'Johnny';
    case USER_LAST_NAME:
      return 'Doe';
    case DOMAIN:
      return 'website.com';
    case PATH:
      return '/to/here';
    default:
      return '';
  }
};

/**
 *
 * @param {string} input - simple util to format user input into ('some', 'thing', 'else') form
 */
const formatInStringList = (input) => {
  const stripAndSplit = input.replace(/\s+/g, '').split(',');
  return stripAndSplit.reduce((final, val, i) => {
    return `${final}${i !== 0 ? ', ' : ''}'${val}'`;
  }, '');
};

/**
 *
 * @param {string} input - simple util to format user input into ('some', 'thing', 'else') form
 */
const formatInIntegerList = (input) => {
  const stripAndSplit = input.replace(/\s+/g, '').split(',');
  return stripAndSplit.reduce((final, val, i) => {
    return `${final}${i !== 0 ? ', ' : ''}${val}`;
  }, '');
};

/**
 *
 * @param {Object} items - map of items that contain user inputs
 */
export const generateSQLStatement = (items) => {
  return Object.values(items).reduce((statement, item, i) => {
    const { predicate, operator, userInput, userInput2 } = item;
    const predicateType = getTypeOfPredicate(item.predicate);
    let value;
    switch (operator) {
      case BETWEEN:
        return `${statement} ${
          i !== 0 ? 'AND' : ''
        } ${predicate} BETWEEN ${userInput} AND ${userInput2}`;
      case CONTAINS:
        return `${statement} ${
          i !== 0 ? 'AND' : ''
        } Contains(${predicate}, '${userInput}')`;
      case IN:
        if (predicateType === TEXT) {
          value = formatInStringList(userInput);
        } else {
          value = formatInIntegerList(userInput);
        }
        return `${statement} ${
          i !== 0 ? 'AND' : ''
        } ${predicate} IN (${value})`;
      case STARTS_WITH:
        return `${statement} ${
          i !== 0 ? 'AND' : ''
        } ${predicate} LIKE '${userInput}%'`;
      default:
        value = userInput;
        if (predicateType === TEXT) {
          value = `'${value}'`;
        }
        return `${statement} ${
          i !== 0 ? 'AND' : ''
        } ${predicate} ${operator} ${value}`;
    }
  }, 'SELECT * FROM tables WHERE');
};
