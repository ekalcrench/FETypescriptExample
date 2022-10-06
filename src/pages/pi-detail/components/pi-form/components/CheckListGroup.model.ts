import { AreaCheckSheetModel, CheckSheetValueModel, PIQuestionModel, ZoneCheckSheetModel } from "../PIForm.model";

export interface ChecklistProps {
    areaChecksheets: AreaCheckSheetModel[],
    piFormData: ZoneCheckSheetModel[]
    piQuestions: PIQuestionModel
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void,
    onBacklogClick: (backlogId: string) => void
}

export interface CheckListItemProps {
    checkSheetValue: CheckSheetValueModel,
    piFormData: ZoneCheckSheetModel[]
    piQuestions: PIQuestionModel
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
    onBacklogClick: (backlogId: string) => void
}