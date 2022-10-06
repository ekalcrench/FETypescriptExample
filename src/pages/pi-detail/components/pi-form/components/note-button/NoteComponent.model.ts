import { CheckSheetValueModel, PIQuestionModel, ZoneCheckSheetModel } from "../../PIForm.model";

export interface NoteProps {
    piFormData: ZoneCheckSheetModel[]
    piQuestions: PIQuestionModel
    checkSheetValue: CheckSheetValueModel,
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
}