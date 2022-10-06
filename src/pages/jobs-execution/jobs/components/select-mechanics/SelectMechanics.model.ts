import { MechanicListModel, JobsDataModel } from "../../JobsPage.model";

export interface SelectMechanicsProps{
    onCancel: () => void;
    onAssign: () => void;
    onClick: (mechanic: MechanicListModel) => void;
    displayMode: string;
    selectedJobs: JobsDataModel[];
    mechanicList: MechanicListModel[];
    selectedMechanics: MechanicListModel[]
    selectedLeader?: MechanicListModel
    assignJobsResponse: boolean
    unassignJobsResponse?: boolean
}
