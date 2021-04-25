

export interface EventStartProps extends EventProps {
    select: string[];
    group: string[];
}


export interface EventDataProps extends EventProps {
    os: string;
    browser: string;
    min_response_time: number;
    max_response_time: number;
}

export interface EventSpanProps extends EventProps {
    begin: Date;
    end: Date;
}

export interface EventProps {
    timestamp: Date;
    type: 'span' | 'data' | 'start' | 'stop';

}

export interface EventsDataProps extends EventProps{

}