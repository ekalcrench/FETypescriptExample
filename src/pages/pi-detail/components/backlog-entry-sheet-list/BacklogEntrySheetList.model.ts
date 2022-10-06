import { BacklogListParameter } from "../../PiDetailPage.model";
import { BacklogListModel } from "../job-list/JobList.model";

export interface BacklogEntrySheetListProps{
    onClickBesList: (backlogId: string) => void;
    updateBacklogParameter: (payload: BacklogListParameter) => void;
    displayMode?: string;
    backlogList: BacklogListModel,
    backlogParameter: BacklogListParameter
    isExpanded: boolean;
}