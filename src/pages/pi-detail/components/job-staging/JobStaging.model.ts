import { StagingInfoModel } from "../../PiDetailPage.model";
import { TimezoneState } from "../../../../core/timezone-helpers/Timezone.actions";

export interface JobStagingProps{
    onClick: () => void;
    setTimezone: (timezone: string) => void
    timezoneInfo: TimezoneState,
    displayMode?: string;
    stagingInfo: StagingInfoModel[]
}

export interface JobsStagingDetailProps {
    info: StagingInfoModel,
    displayMode: string,
    icon: string,
    timezoneInfo: TimezoneState,
    onClick: () => void
}
