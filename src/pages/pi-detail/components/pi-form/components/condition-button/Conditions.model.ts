import { ConditionModel, PIQuestionModel, ZoneCheckSheetModel, CheckSheetValueModel } from '../../PIForm.model';

export interface ConditionProps {
    mCondition: ConditionModel,
    measurement: string,
    piQuestions: PIQuestionModel
    piFormData: ZoneCheckSheetModel[]
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
    onClickCondition: (condition: ConditionModel) => void
}

export interface ConditionGroupsProps {
    isOpen: boolean;
    anchorEl: any,
    mCondition: ConditionModel,
    measurement: string,
    piQuestions: PIQuestionModel
    piFormData: ZoneCheckSheetModel[]
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
    onClose: () => void
    onClick: (condition: ConditionModel) => void
}

export interface Conditions {
    icon: string,
    desc: string,
    containerClassName: string,
}

