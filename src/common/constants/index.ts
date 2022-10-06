export enum RequestMethod{
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum Menu{
    LOGIN = '/webdca/',
    DASHBOARD = '/webdca/dashboard',
    JOBS = '/webdca/jobs',
    JOBS_SUMMARY = '/webdca/jobs/summary',
    JOBS_REPORT = '/webdca/jobs/report',
    DETAIL_PI = '/webdca/jobs/summary/detailpi',
    BACKLOG = '/webdca/backlog',
    FC = '/webdca/fc',
    MASTER_DATA = '/webdca/masterdata',
    SETTINGS = '/webdca/settings',
    LOGOUT = '/webdca/logout'
}

export const USER_DATA = 'USER_DATA';
export const JOB_DATA = 'SELECTED_JOB_DATA'
export const USER_LOGOUT = 'USER_LOGOUT';
export const REQUEST_TIME_OUT = 50000

export const StorageKey = {
    USER_DATA: 'USER_DATA_STORAGE_KEY',
    JOB_DATA: 'JOB_DATA_STORAGE_KEY'
}

export const ApiUrlBase = {
    AUTH_API_URL: process.env.REACT_APP_AUTH_API_URL,
    WORK_ORDER_API_URL: process.env.REACT_APP_WORK_ORDER_API_URL,
    TRACKING_API_URL: process.env.REACT_APP_TRACKING_API_URL,
    PI_API_URL: process.env.REACT_APP_PI_API_URL,
    BES_API_URL: process.env.REACT_APP_BES_API_URL,
    ASSIGNMENT_API_URL: process.env.REACT_APP_ASSIGNMENT_API_URL,
}

export const BasePathDev = '.'
export const BasePathProv = '../..'
export const BasePathSec = '..'

export const BasePath = BasePathDev

export enum JobProgressDetail {
    WAITING_TO_START = 1,
    TRAVELING = 2,
    WAITING = 3,
    EXECUTION = 4,
    REPORTING = 5
}

export const NoteCode = {
    LEAKING: '1',
    BROKEN: '2',
    MISSING: '3',
    LOOSE: '4',
    WORN: '5',
    CRACK: '6',
    OTHERS: '7'
}

export const PriorityCode = {
    NOW: '1',
    NEXT_SHIFT: '2',
    NEXT_PS: '3',
    NEXT_BACKLOG: '4'
}

export const ConditionCode = {
    GOOD: 'NMG',
    BAD: 'NMB',
    UNCHECK: 'NMU',
    FLUID_LOW: 'FLL',
    FLUID_MEDIUM: 'FLM',
    FLUID_HIGH: 'FLH',
    VIOLANCE_SOFT: 'SVS',
    VIOLANCE_HARD: 'SVH',
    SOIL_THICK_CLEAN: 'TSC',
    SOIL_THICK_MEDIUM: 'TSM',
    SOIL_THICK_HIGH: 'TSH',
    REFRIGRERANT_EMPTY: 'TSE',
    REFRIGRERANT_LOW: 'RFL',
    REFRIGRERANT_HIGH: 'RFH',
    GRACE25: 'GRD',
    GRADE50: 'GRL',
    GRACE75: 'GRT',
    GRACE100: 'GRS'    
}

export enum StatusCode{
    ACCEPTED ='ACCEPTED',
    BAD_REQUEST ='BAD_REQUEST',
    CREATED = 'CREATED',
    FORBIDDEN = 'FORBIDDEN',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    NO_CONTENT = 'NO_CONTENT',
    NOT_FOUND = 'NOT_FOUND',
    NOT_MODIFIED = 'NOT_MODIFIED',
    OK = 'OK',
    PARTIAL_CONTENT = 'PARTIAL_CONTENT',
    RANGE_NOT_SATISFIABLE = 'RANGE_NOT_SATISFIABLE',
    REDIRECT ='REDIRECT',
    UNAUTHORIZED = 'UNAUTHORIZED'
}