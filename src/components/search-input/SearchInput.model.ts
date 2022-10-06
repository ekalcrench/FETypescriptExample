export interface SearchInputState{
    value: string;
}

export interface SearchInputProps{
    onSearch: (keyword: string) => void;
    displayMode?: string
    webInfo?: string
    generalInfo?: string
    className?: string
}