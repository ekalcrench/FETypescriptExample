export interface JobsPageState {
    isUnassignConfirmationShown: boolean;
    isShowSelectMechanicsModal: boolean;
    isShowSelectLeaderModal: boolean;
    isShowAssignSucceed: boolean;
    isFilterShown: boolean;
    isSortShow: boolean;
    jobProgress: number;
}

export interface JobsAssignmentParameter {
    searchValue: string,
    jobtypeFilter: string;
    unitModelFilter: string;
    assigmentFilter: boolean,
    inProgressFilter: boolean,
    approvalFilter: boolean,
    customerFilter: string;
    sortByUnitModel: boolean,
    sortByUnitCode: boolean,
    sortByJobType: boolean,
    sortByWorkOrder: boolean,
    sortByWorkCenter: boolean,
    sortByCustomer: boolean,
    sortByPlantExecution: boolean,
    sortByStatus: boolean,
    sortByStaging: boolean,
    sortByOpenBacklog: boolean,
    orderDesc: boolean,
    currentPage: number,
    pageSize: number,
}

export interface JobsAssigmentModel {
    searchValue?: string,
    assigmentFilter?: boolean,
    inProgressFilter?: boolean,
    approvalFilter?: boolean,
    jobTypeFilter?: any[];
    unitModelFilter?: any[];
    customerFilter?: any[];
    currentPage: number,
    pageSize: number,
    tableValues: JobsDataModel[];
    numberOfPage: number,
    nextPage: boolean,
    prevPage: boolean,
    periodicInspectionUnassign?: number,
    periodicInspectionHandover?: number,
    periodicInspectionTotal?: number,
    periodicServiceUnassign?: number,
    periodicServiceHandover?: number,
    periodicServiceTotal?: number,
    unscheduleBreakdownUnassign?: number,
    unscheduleBreakdownHandover?: number,
    unscheduleBreakdownTotal?: number
}

export interface JobsSortByState {
    unitModel: JobsSortByModel;
    unitCode: JobsSortByModel;
    jobType: JobsSortByModel;
    workOrder: JobsSortByModel;
    customer: JobsSortByModel;
    plantExecution: JobsSortByModel;
    status: JobsSortByModel;
    backlogOpen: JobsSortByModel;
    staging: JobsSortByModel;
}

export interface JobsSelectedFilters {
    jobType: string;
    unitModel: string;
    customer: string;
    jobsAssignment?: string;
}

export interface JobsSortByModel {
    isActive: boolean;
    isAscending: boolean;
}

export interface JobsAssignmentState {
    filtersRestData: JobsAssigmentModel;
    selectedFilters: JobsSelectedFilters
}

export interface JobsDataModel {
    jobType?: string,
    unitModel?: string,
    unitCode?: string,
    workOrderId?: string,
    unitSerialNumber?: string,
    engineModel?: string,
    engineSerialNumber?: string,
    lastSMR?: number,
    woNumber?: string,
    workCenter?: string,
    customer?: string,
    smrLastValueDate?: Date,
    plantExecution?: Date,
    status?: string,
    location?: string,
    staging?: string,
    openBacklog?: number,
    equipmentNumber?: string,
    plant?: string,
    isHandover?: boolean
    supervisorApprovalDate?: Date,
}

export interface SelectedJobsModel {
    jobList: JobsDataModel[]
}

export interface NewAssignmentModel {
    mechanicList?: MechanicListModel[]
    mechanicLeader?: MechanicListModel
    jobList?: JobsDataModel[]
}

export interface MechanicListModel {
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    mechanicUT?: boolean
    penugasan?: AssignMechanicInfo[]
}

export interface AssignMechanicInfo {
    jobType: string,
    jumlah: number,
}
