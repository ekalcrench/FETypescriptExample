import { BacklogEntrySheet } from "../backlog-entry-sheet-detail/BacklogEntrySheetDetail.model";
import { BacklogListParameter } from "../../PiDetailPage.model";

export interface JobListProps{
    onClick: (backLogId: string) => void;
    updateBacklogParameter: (payload: BacklogListParameter) => void;
    displayMode?: string;
    backlogList: BacklogListModel,
    backlogParameter: BacklogListParameter
}

export interface BacklogListModel{
    listBacklog: BacklogEntrySheet[]
    currentPage: number,
    totalPage: number,
    totalItem?: number;
    prevPage: boolean,
    nextPage: boolean,
}