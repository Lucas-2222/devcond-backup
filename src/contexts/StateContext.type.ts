import React, { ReactNode } from 'react';

export interface StateProviderProps {
    children: ReactNode;
}

export type User = {
    name: string;
}

export type Properties = {
    id: number;
    name: string;
}
