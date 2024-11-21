interface activity {
  start_time_tbd: boolean;
  stakes: string;
  in_conference: boolean;
  participating_teams: participating_teams[];
  activity_name: string;
  event_type: string;
  venue: venue;
  status: string;
  additional_notes: string;
  start_time: string;
  end_time: string;
}

interface participating_teams {
  activity_type: activity_type;
  team_name: string;
  participating_organizations: participating_organizations[];
  system_mapping: system_mapping[];
  participation_status: '';
  additional_fields: {
    arrival_time: '0001-01-01T00:00:00Z';
    departure_time: '0001-01-01T00:00:00Z';
  };
  score: null;
  is_tbd: false;
}

interface activity_type {
  department: string;
  department_display_label: string;
  type: string;
  type_display_label: string;
  level: string;
  level_display_label: string;
  gender: string;
  gender_display_label: string;
  season: string;
  season_display_label: string;
}

interface venue {
  is_tbd: false;
  name: string;
  on_campus: false;
  address: address;
  school: school;
  instructions: string;
  system_mapping: system_mapping[];
}

interface school {
  organization_type: string;
  name: string;
  address: address;
  system_mapping: system_mapping[];
  playon_service: string[];
}

interface participating_organizations {
  organization_type: string;
  name: string;
  address: address;
  system_mapping: system_mapping[];
  playon_service: string[];
}

export interface source_modifier {
  system: string;
  user_id: string;
  organization: scheduling_organization;
  email: string;
  name: {
    surname: string;
    given_name: string;
  }
}

export interface scheduling_organization {
  organization_type: string;
  name: string;
  address: address;
  system_mapping: system_mapping[];
  playon_service: string[];
}

interface address {
  type: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zip: string;
}

enum source_action {
  added = 'added',
  updated = 'updated',
  canceled = 'canceled',
  deleted = 'deleted',
}

enum system {
  activity_scheduler = 'Activity Scheduler',
  vnn = 'VNN',
  hq = 'HQ',
  dragonfly = 'Dragonfly',
  arbiter = 'Arbiter',
  nfhs = 'NFHS',
}

interface additional_fields {
  streaming_link: string;
  ticketing_link: string;
  broadcast_start_time: string;
  broadcast_end_time: string;
  is_featured: null;
  ticketing_listed: null;
  streaming_listed: null;
  vod_listed: false;
  updated_via_dedupe: false;
  live_scores_enabled: null;
}

interface system_mapping {
  name: string;
  id: string;
}


export interface EventData {
  event_hub_id: string;
  version_number: Number;
  version: string;
  source_system: system;
  source_action: source_action;
  system_mapping: system_mapping[];
  originating_system: system;
  scheduling_organization: scheduling_organization;
  source_modifier: source_modifier;
  created_at: string;
  updated_at: string;
  activity: activity;
  additional_fields: additional_fields;
  is_published: boolean;
}
