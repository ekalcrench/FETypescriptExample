import { CheckSheetValueModel, PIQuestionModel, ZoneCheckSheetModel } from "../../PIForm.model";

export interface PriorityProps {
    piFormData: ZoneCheckSheetModel[]
    piQuestions: PIQuestionModel
    checkSheetValue: CheckSheetValueModel,
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
}

export interface PriorityStyle {
    textStyle: string
}