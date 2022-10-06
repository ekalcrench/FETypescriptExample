export interface PiDetailPageState{
    isShowWorkOrderModal: boolean;
    isShowJobInprogressDetail: boolean;
    isShowBesListDetailModal: boolean;
    isShowPiFormModal: boolean;
    isPIConfirmationShown: boolean;
    isBESConfirmationShown: boolean,
    isBMSConfirmationShown: boolean,
    isSubmitSucceed: boolean;
    isProceedConfirmationShown: boolean,
    isHandoverConfirmationShown: boolean,
}

export interface StagingInfoModel {
    workOrderId: string,
    sequence: number,
    title: string,
    startdate: Date,
    enddate: Date,
    longtitude: string,
    latitude: string,
    shift?: number,
    type: string
}

export interface BacklogListParameter {
    workorderid: string,
    equipmentNumber?: string,
    filter?: string,
    showBMS?: boolean,
    showBES?: boolean,
    pageSize?: number,
    currentPage?: number,
}

export interface BacklogSummaryModel {
    backlogEntryPriority1: number,
    backlogEntryPriority2: number,
    backlogEntryPriority3: number,
    backlogEntryPriority4: number,
    backlogMonitoringUpdate: number
}
