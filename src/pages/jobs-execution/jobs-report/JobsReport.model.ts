export interface JobsReportModel {
    searchValue?: string,
    jobtypeFilter?: string,
    unitModelFilter?: string,
    customerFilter?: string,
    dateMalfunctionStart?: Date,
    dateMalfunctionEnd?: Date,
    sortByJobType?: boolean,
    sortByUnitModel?: boolean,
    sortByUnitCode?: boolean,
    sortByWorkOrder?: boolean,
    sortByPlantExecution?: boolean,
    sortByCustomer?: boolean,
    orderDesc?: boolean,
    currentPage?: number,
    pageSize?: number,
}