const v1 = '/v1';
const v2 = '/v2';
const events = '/events/';
const searchEvents = '/search/events';

export enum URI_HQ {
  EVENTS = `${events}`
}

export enum URI_EH {
  EVENTS_FILTER = `${v1}${events}filter`
}

export enum URI_NFHS {
  SEARCH_EVENTS = `${v2}${searchEvents}`
}
