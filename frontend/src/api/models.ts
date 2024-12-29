export interface Term {
    id: number;
    title: string;
    description?: string;
    source?: string;
}


export interface Relationship {
    id: number;
    source_id: number;
    target_id: number;
    relation?: string;
}