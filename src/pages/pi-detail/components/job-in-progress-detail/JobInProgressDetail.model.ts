import { StagingInfoModel } from "../../PiDetailPage.model";

export interface JobInProgressDetailProps {
    onClose: () => void;
    displayMode?: string;
    stagingInfo: StagingInfoModel[]    
}

export interface StagingDetail {
    className: string,
    icon: any,
    iconClassName: string
    stagingLine?: any,
    stagingLineTab?: any,
}

export interface ShiftCardProps {
    stage: StagingInfoModel
    status: string | 'completed' | 'not yet'
}