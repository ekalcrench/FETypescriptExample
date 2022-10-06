export interface JobsSummaryProps{
    data: JobsSummaryModel;
    displayMode?: string;
}

export interface JobsSummaryModel{
    title: string;
    total: number;
    todo: number;
    handover: number;
}