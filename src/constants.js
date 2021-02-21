export const NUMBER = 'number';
export const TEXT = 'text';

export const USER_EMAIL = 'user_email';
export const SCREEN_WIDTH = 'screen_width';
export const SCREEN_HEIGHT = 'screen_height';
export const VISITS = 'visits';
export const USER_FIRST_NAME = 'user_first_name';
export const USER_LAST_NAME = 'user_last_name';
export const PAGE_RESPONSE = 'page_response';
export const DOMAIN = 'domain';
export const PATH = 'path';

export const predicateOptions = [
  {
    label: 'User Email',
    value: 'user_email',
  },
  {
    label: 'Screen Width',
    value: 'screen_width',
  },
  {
    label: 'Screen Height',
    value: 'screen_height',
  },
  {
    label: '# of Visits',
    value: 'visits',
  },
  {
    label: 'First',
    value: 'user_first_name',
  },
  {
    label: 'Last',
    value: 'user_last_name',
  },
  {
    label: 'Page Response time (ms)',
    value: 'page_response',
  },
  {
    label: 'Domain',
    value: 'domain',
  },
  {
    label: 'Page path',
    value: 'path',
  },
];

export const CONTAINS = 'contains';
export const STARTS_WITH = 'starts_with';
export const IN = 'IN';

export const stringOperators = [
  {
    label: 'equals',
    value: '=',
  },
  {
    label: 'contains',
    value: CONTAINS,
  },
  {
    label: 'starts with',
    value: 'starts_with',
  },
  {
    label: 'in list',
    value: IN,
  },
];

export const BETWEEN = 'between';

export const integersOperators = [
  {
    label: 'equals',
    value: '=',
  },
  {
    label: 'between',
    value: BETWEEN,
  },
  {
    label: 'greater than',
    value: '>',
  },
  {
    label: 'less than',
    value: '<',
  },
  {
    label: 'in list',
    value: IN,
  },
];
