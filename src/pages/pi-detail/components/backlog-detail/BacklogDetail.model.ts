import { BacklogEntrySheet } from "../backlog-entry-sheet-detail/BacklogEntrySheetDetail.model";
import { BacklogListParameter } from "../../PiDetailPage.model";

export interface BacklogDetailProps{
    onClick: () => void;
    updateBacklogParameter: (payload: BacklogListParameter) => void;
    displayMode?: string;
    backlogDetail: BacklogEntrySheet;    
}
