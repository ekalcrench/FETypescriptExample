import { BacklogListModel } from "../job-list/JobList.model";
import { BacklogListParameter, BacklogSummaryModel } from "../../PiDetailPage.model";
import { ZoneCheckSheetModel, PIDetailModel } from "../pi-form/PIForm.model";
import { ApiRequestActionsStatus } from "../../../../core/rest-client-helpers";

export interface InformationSummaryProps{
    onClickBesList: (backlogId: string) => void;
    onClickPiForm: () => void;
    updateBacklogParameter: (payload: BacklogListParameter) => void;
    displayMode?: string;
    backlogList: BacklogListModel,
    backlogParameter: BacklogListParameter,
    backlogSummary: BacklogSummaryModel,
    piAnswers: PIDetailModel,
    piFormData: ZoneCheckSheetModel[],
}

export interface InformationSummaryState{
    isExpanded: boolean;
    isShowBes: boolean;
}