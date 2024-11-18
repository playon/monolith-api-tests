import { addDaysToDate } from "src/utils/date.utils";

interface monolithEvent {
    genders: string[];
    allDayEvent: boolean;
    financialAccountId: string;
    taggedAccountIds: string[];
    levels: level[];
    startDateTime: string;
    startTimeType: string;
    startTimeOptions: {};
    endDateTime: string;
    accountId: string;
    activityId: Number;
    reportingLabel: string;
    name: string;
    venueCity: string;
    venueAddress: string;
    venueLocation: string;
    venueName: string;
    venueId: Number;
    venueState: string;
    venueZip: string;
    eventValidationStartsBefore: Number;
    enableEventValidation: boolean;
    redemptionWindow: null;
    archived: boolean;
    publishDateTime: string;
    featuredAccountIds: string[];
    ticketLimitPerOrder: Number;
    glCode: null;
    products: product[];
    accountsTicket: string[];
    ticketDistribution: boolean;
    eventIntegrationDetails: eventIntegrationDetails[];
    featured: boolean;
    disableQr: boolean;
    postSeason: boolean;
    timeZone: string;
    specialEventDescription: string;
    disabledForIndividualSale: boolean;
}

interface eventIntegrationDetails {
    broadcastStartTime: string;
    broadcastEndTime: string;
    isBroadcast: boolean;
    streamOnly: boolean;
    pixellotKey: string;
    unListed: boolean;
    vodUnlisted: boolean;
    level: string;
    gender: gender;
    levelByGender: string;
}

interface product {
    hiddenFees: boolean;
    groupId: string;
    distributionChannel: string;
    enabled: boolean;
    name: string;
    price: Number;
    productType: string;
    promotionRequired: boolean;
    reservedSeating: boolean;
    generateLink: boolean;
    formFields: string[]
}

export enum gender {
    boys = 'Boys',
    girls = 'Girls',
    other = 'Other'
}

export interface level {
    levelId: Number;
    genders: gender[];
}

export class monolith {
    static createEvent(gender: gender, activityId: Number, accountId: string): monolithEvent {
        return{
            genders: [],
            allDayEvent: false,
            financialAccountId: 'WI18284',
            taggedAccountIds: [],
            levels: [
                {
                levelId: 1,
                genders: [gender]
                },
                {
                    levelId: 2,
                    genders: [gender]
                    },
            ],
            startDateTime: addDaysToDate(10),
            startTimeType: 'DIFFERENCE_TIME',
            startTimeOptions: {},
            endDateTime: addDaysToDate(15),
            accountId: accountId,
            activityId: activityId,
            reportingLabel: 'Archery',
            name: 'MG Joint Editor Payload streamOnly fals',
            venueCity: 'BLACK RIVER FALLS',
            venueAddress: '1200 PIERCE ST',
            venueLocation: '',
            venueName: 'Lunda Fieldhouse',
            venueId: 21441,
            venueState: 'WI',
            venueZip: '54615',
            eventValidationStartsBefore: 240,
            enableEventValidation: true,
            redemptionWindow: null,
            archived: false,
            publishDateTime: addDaysToDate(10),
            featuredAccountIds: [],
            ticketLimitPerOrder: 30,
            glCode: null,
            products: [
                {
                    hiddenFees: false,
                    groupId: '1722448694886',
                    distributionChannel: 'GoFan',
                    enabled: true,
                    name: 'GA',
                    price: 10,
                    productType: 'TICKET',
                    promotionRequired: false,
                    reservedSeating: false,
                    generateLink: false,
                    formFields:[]
                }
            ],
            accountsTicket: [],
            ticketDistribution: false,
            eventIntegrationDetails: [
                {
                    broadcastStartTime: '07:00 PM',
                    broadcastEndTime: '11:00 PM',
                    isBroadcast: true,
                    streamOnly: false,
                    pixellotKey: 'pxl0725e3659e',
                    unListed: false,
                    vodUnlisted: true,
                    level: 'Varsity',
                    gender: gender,
                    levelByGender: 'Boys-Varsity'
                },
                {
                    broadcastStartTime: '02:00 PM',
                    broadcastEndTime: '06:00 PM',
                    isBroadcast: true,
                    streamOnly: false,
                    pixellotKey: 'pxl0725e3659e',
                    unListed: false,
                    vodUnlisted: true,
                    level: 'Junior Varsity',
                    gender: gender,
                    levelByGender: 'Boys-Junior Varsity'
                }
            ],
            featured: false,
            disableQr: true,
            postSeason: false,
            timeZone: 'America/Chicago',
            specialEventDescription: 'Boys Varsity/Junior Varsity',
            disabledForIndividualSale: false
        };
    }
}
/*
 genders: string[];
    allDayEvent: boolean;
    financialAccountId: string;
    taggedAccountIds: string[];
    levels: level[];
    startDateTime: string;
    startTimeType: string;
    startTimeOptions: {};
    endDateTime: string;
    accountId: string;
    activityId: Number;
    reportingLabel: string;
    name: string;
    venueCity: string;
    venueAddress: string;
    venueLocation: string;
    venueName: string;
    venueId: Number;
    venueState: string;
    venueZip: string;
    eventValidationStartsBefore: Number;
    enableEventValidation: boolean;
    redemptionWindow: null;
    archived: boolean;
    publishDateTime: string;
    featuredAccountIds: string[];
    ticketLimitPerOrder: Number;
    glCode: null;
    products: product[];
    accountsTicket: string[];
    ticketDistribution: boolean;
    eventIntegrationDetails: eventIntegrationDetails[];
    featured: boolean;
    disableQr: boolean;
    postSeason: boolean;
    timeZone: string;
    specialEventDescription: string;
    disabledForIndividualSale: boolean;
*/