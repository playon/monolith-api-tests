export interface EventResponseVNN {
    start: Number,
    size: Number,
    cursor: "",
    items: item[],
    total: 2
}

interface item {
    key: string,
    created_at: string,
    creator: string,
    updated_at: string,
    updater: null,
    start_time: string,
    time_to_be_determined: Boolean,
    time_zone: string,
    city: string,
    state_code: string,
    sublocation: null,
    sublocation_detail: null,
    location_to_be_determined: Boolean,
    teams_to_be_determined: Boolean,
    sport: string,
    game_type: string,
    gender: string,
    level: string,
    classification: null,
    class_label: null,
    is_sport: Boolean,
    has_broadcast: Boolean,
    has_vod: Boolean,
    has_datacast: Boolean,
    has_dvd: Boolean,
    has_highlight: Boolean,
    highlight_count: 0,
    is_pixellot: Boolean,
    is_deleted: Boolean,
    revenue_share: Boolean,
    is_tournament: Boolean,
    required_entitlement: null,
    start_time_email: Boolean,
    start_time_email_image_url: null,
    home_score: null,
    away_score: null,
    overridden_score: null,
    event_redirect: null,
    share_image: string,
    locked_fields: null,
    is_archived: Boolean,
    is_cleaned: Boolean,
    venue_id: string,
    created_by_user: string,
    updated_by_user: null,
    spalk_commenter_url: null,
    live_like_chat_room: null,
    event_tags: [],
    score: Number,
    priority: string,
    state_name: string,
    content_type: string,
    local_start_time: string,
    home_team: string,
    home_participant: string,
    participants_should_have_level_gender: Boolean,
    status: string,
    payment_required: string,
    is_testing: Boolean,
    has_power_participant: Boolean,
    sis_event: Boolean,
    site_url: string,
    is_postseason: Boolean,
    is_partner_game: Boolean,
    arbiter_partner_id: null,
    track_wrestling: null,
    teams: team[],
    participants: participant[],
    attribution_schools: any[],
    publishers: publisher[],
    tickets: ticket[],
    has_tickets: Boolean,
    partner_name: string,
    partner_game_id: string,
    has_tickets_remaining: Boolean,
    has_ticketing: Boolean,
    id: string
}
interface team {
    key: string,
    name: string,
    mascot: string,
    short_name: string,
    slug: string,
    acronym: string,
    power_school: Boolean,
    sis_school: Boolean,
    is_network: Boolean,
    scrub_vod: Boolean,
    school_key: string,
    sport: string,
    gender: string,
    level: string,
    school_url: string,
    logo: string,
    primary_color: string,
    secondary_color: string,
    city: string,
    state_code: string,
    latitude: null,
    longitude: null
}

interface participant {
    key: string,
    name: string,
    mascot: string,
    short_name: string,
    slug: string,
    acronym: string,
    power_school: Boolean,
    sis_school: Boolean,
    is_network: Boolean,
    scrub_vod: Boolean,
    school_key: string,
    sport: string,
    gender: string,
    level: string,
    school_url: string,
    logo: string,
    primary_color: string,
    secondary_color: string,
    city: string,
    state_code: string,
    latitude: null,
    longitude: null
}

interface publisher {
    key: string,
    is_deleted: null,
    slug: string,
    name: string,
    type: string,
    publisher_location: null,
    dma_list: null,
    geo_fence_description: null,
    school_url: string,
    school: string,
    school_key: string,
    publisher_key: string,
    time_zone: string,
    city: string,
    states: string[],
    state_names: string[],
    facebook: null,
    twitter: null,
    instagram: null,
    website: string,
    youtube: null,
    social_media: null,
    logo: string,
    primary_color: string,
    secondary_color: string,
    show_ads: Boolean,
    show_champion_ads: Boolean,
    acronym: string,
    short_name: string,
    pays_license_fee: Boolean,
    formatted_name: string,
    is_sbp: Boolean,
    scrub_vod: Boolean,
    is_network: Boolean,
    is_subscription: Boolean,
    has_dvd_publisher: Boolean,
    is_dto_enabled: Boolean,
    broadcasts: broadcast[],
    datacasts: any[],
    vods: vod[],
    dvds: any[]
}

interface broadcast {
    key: string,
    status: string,
    embed_url: null,
    headline: string,
    subheadline: string,
    custom_title: Boolean,
    description: string,
    unlisted: Boolean,
    is_deleted: Boolean,
    playon_broadcast_id: null,
    start_time: string,
    entitlement_period: string,
    view_url: string,
    camera_type: null,
    sound_mixer: null,
    created_at: string,
    updated_at: string,
    updater: string,
    platform: null,
    capture_device: null,
    total_bytes: null,
    bytes_available: null,
    pixellot_event_id: string,
    duration: Number,
    multi_court: null,
    hls_startup_buffer_seconds: null,
    stream_to_facebook: null,
    facebook_publish_page: string,
    camera_position: null,
    pixellot_highlights_url: null,
    spalk_rtmp_url: null,
    spalk_commenter_url: null,
    spalk_error: null,
    created_by_user: string,
    updated_by_user: string,
    contact_name: null,
    contact_phone: null,
    payment_required: Boolean,
    is_subscription: Boolean,
    thumbnail: string,
    default_thumbnail: string,
    errors: null,
    html_details_content: null,
    pixellot_overlay:{
        top_left: null,
        bottom_left: null,
        bottom_right: null
    },
    publisher_url: string,
    publisher_name: string,
    publisher_name_with_association: string,
    publisher_key: string,
    ingest_point: null,
    producer_name: string,
    producer_name_with_association: string,
    producer_key: string,
    producer_type: string,
    producer_slug: string,
    pixellot_id: string,
    pixellot_key: string,
    vod_key: string,
    game_url: string,
    game_key: string,
    player_config_url: null,
    hd_enabled: null,
    vod_unlisted: Boolean,
    vod_blackout_start: null,
    vod_blackout_end: null,
    test_stream_url: null,
    test_stream_status: null
}

interface vod {
    key: string,
    status: string,
    embed_url: null,
    headline: string,
    subheadline: string,
    custom_title: Boolean,
    description: string,
    blackout_start_date: null,
    blackout_end_date: null,
    unlisted: Boolean,
    is_deleted: null,
    playon_broadcast_id: null,
    start_time: string,
    entitlement_period: string,
    created_at: string,
    creator: string,
    updated_at: null,
    mute: null,
    created_by_user: string,
    updated_by_user: null,
    download_to_own: Boolean,
    pixellot_event_id: string,
    payment_required: Boolean,
    is_subscription: Boolean,
    publisher_key: string,
    publisher_type: string,
    publisher_name: string,
    publishing_school: {
        school_key: string,
        city: string,
        state: string
    },
    revenue_share: Boolean,
    publisher_time_zone: string,
    producer_name: string,
    producer_name_with_association: string,
    producer_key: string,
    producer_slug: string,
    producer_type: string,
    thumbnail: string,
    default_thumbnail: string,
    publisher_url: string,
    game_url: string,
    game_key: string,
    player_config_url: string,
    download_paypal_code: null,
    download_description: null,
    notification_email: any[]
}

interface ticket {
    key: string,
    is_deleted: Boolean,
    gofan_event_id: string,
    gofan_json: gofan_json[],
    game_key: string
}

interface gofan_json {
    venue: null,
    gameType: string,
    timezone: string,
    eventLink: string,
    partnerId: null,
    partnerName: null,
    pixellotKey: null,
    awayHuddleId: null,
    deletedEvent: Boolean,
    eventDetails: eventDetail[],
    homeHuddleId: string,
    onSaleEndTime: null,
    salesDisabled: Boolean,
    onSaleStartTime: string,
    eventStartDateTime: string,
    translatedActivity: string,
    goFanTicketRemainingUpdatedAt: null,
    ticketsRemaining: 1000000
}

interface eventDetail {
    level: string,
    gameId: string,
    gender: string,
    eventId: Number,
    gameKey: null,
    venueId: null,
    version: 0,
    opponent: null,
    unListed: Boolean,
    startTime: null,
    eventHubId: null,
    streamOnly: Boolean,
    isBroadcast: Boolean,
    pixellotKey: string,
    vodUnlisted: Boolean,
    participants: null,
    broadCastTime: null,
    broadcastEndTime: string,
    broadcastStartTime: string,
    vodBlackoutEndDate: null,
    vodBlackoutStartDate: null
}