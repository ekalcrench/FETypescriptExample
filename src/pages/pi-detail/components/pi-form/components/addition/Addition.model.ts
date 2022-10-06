import { AdditionalFluid, ZoneCheckSheetModel } from "../../PIForm.model";

export interface AdditionProps {
    additionalFluids: AdditionalFluid[],
    displayMode?: string,
    piFormData: ZoneCheckSheetModel[]
    zone: string,
    woId: string | undefined,
    updatePIForm: (checksheet: ZoneCheckSheetModel[]) => void
}