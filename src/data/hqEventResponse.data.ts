import { gender, level } from "src/api/monolith.data";

export interface EventResponseHQ<T extends gender> {
    _links: {
        resource_logs: {
            href: string
        };
   venue: {
    href: string
   };
   'product-seating': {
    href: string
   };
   activity: {
    href: string
   };
   'event-type': {
    href: string
   };
   self: {
    href: string
   };
   'event-sales-info': {
    href: string
   };
   account: {
    href: string
   };
   levels: {
    href: string
   }
};
   accountId: string;
   accountsTicket: any[];
   activityId: Number;
   activityPath: null;
   alert: null;
   allDayEvent: boolean;
   archived: boolean;
   awayGame: null;
   canceled: boolean;
   canceledAt: null;
   canceledBy: null;
   createdAt: string;
   customSportName: null;
   description: null;
   disableQr: boolean;
   disabledForIndividualSale: boolean;
   emailMessageId: null;
   enableEventValidation: boolean;
   endDateTime: string;
   eventIntegrationDetails: eventIntegrationDetail<T>[];
   eventNotes: null;
   eventTypeId: Number;
   eventValidationStartsBefore: Number;
   featured: boolean;
   featuredAccountIds: any[];
   financialAccountId: string;
   flatFileBatchId: null;
   flatFileEditBatchIds: null;
   formFields: any[];
   formId: null;
   genders: any[];
   glCode: null;
   globalEventsId: null;
   goal: null;
   headerImage: null;
   hiddenFromBoxOffice: boolean;
   hostAccountId: null;
   id: Number;
   levels: level[];
   maxCapacity: null;
   name: string;
   opponentAccountId: null;
   partnerId: null;
   partnerName: null;
   paymentCycle: null;
   pixellotKey: null;
   postSeason: boolean;
   products: product[];
   publishDateTime: string;
   redemptionWindow: null;
   reportingLabel: string;
   salesEndDateTime: null;
   salesStartDateTime: null;
   seasonId: null;
   sendReminder: boolean;
   specialEventDescription: string;
   startDateTime: string;
   startTimeOptions: {};
   startTimeType: string;
   state: null;
   taggedAccountIds: any[];
   termsAndConditions: null;
   theme: null;
   ticketDistribution: boolean;
   ticketLimitPerOrder: Number;
   timeZone: string;
   unityResponse: string;
   updatedBy: string;
   venueAddress: string;
   venueCity: string;
   venueId: Number;
   venueLocation: string;
   venueName: string;
   venueState: string;
   venueZip: string
}

interface eventIntegrationDetail <T extends gender>  {
    broadcastEndTime: string;
    broadcastStartTime: string;
    eventHubId: null;
    gameKey: null;
    gender: T;
    isBroadcast: boolean;
    level: string;
    pixellotKey: string;
    startTime: string;
    streamOnly: boolean;
    unListed: boolean;
    venueId: null;
    vodBlackoutEndDate: null;
    vodBlackoutStartDate: null;
    vodUnlisted: boolean
}

interface product {
    _links: {
        'product-seating': {
            href: string
        }
    };
    accountId: null;
    customColor: null;
    distributionChannel: string;
    enabled: boolean;
    encodedString: null;
    eventId: Number;
    fee: Number;
    formFields: any[];
    formId: null;
    generateLink: false;
    groupId: string;
    hiddenFeeBase: 0;
    hiddenFees: false;
    id: Number;
    limit: null;
    name: string;
    packCount: null;
    price: Number;
    productCategory: string;
    productType: string;
    promotionLabel: null;
    promotionRequired: boolean;
    rateId: Number;
    redemptionLimit: null;
    reservedSeating: boolean;
    salesEndDateTime: null;
    salesStartDateTime: null;
    seasonId: null;
    seatsIoCategory: null;
    sortOrder: null;
    ticketLimitPerOrder: null
}