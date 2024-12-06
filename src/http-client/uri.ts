const v1 = '/v1';
const v2 = '/v2';
const events = '/events';
const searchEvents = '/search/events';

export enum URI_HQ {
  EVENTS = `${events}/`
}

export enum URI_EH {
  EVENTS = `${v1}${events}/`
}

export enum URI_NFHS {
  SEARCH_EVENTS = `${v2}${searchEvents}`
}
