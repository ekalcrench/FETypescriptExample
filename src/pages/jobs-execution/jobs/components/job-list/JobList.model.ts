import { JobsSortByState, JobsDataModel } from "../../JobsPage.model";

export interface JobListHeaderProps{
    name: string;
    isAscending: boolean;
    isActive: boolean;
    delay: number;
    onClick: () => void;
}

export interface JobListProps{
    displayMode?: string,
    jobList: JobsDataModel[],
    selectedJobList: JobsDataModel[],
    sortJobsByState: JobsSortByState;
    displayCheckbox: boolean;
    storeJobData: (payload: JobsDataModel) => void;
    saveJobData: (data: JobsDataModel) => void;
    onChoosed: (data: JobsDataModel) => void;
    onClickTabHead: (type: string) => void;
    pushTo: (url: string) => void;
}