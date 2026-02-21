import type { Shoe } from './shoe';

export type { Shoe } from './shoe';

export interface PageProps {
    title?: string;
}

export interface Player {
    id: number | string;
    name: string;
    team: string;
    position: string;
    bio: string;
    profileImage: string;
    bannerImage: string;
    bannerVideo?: string;
    achievements?: string[];
    shoes: Shoe[];
}

export interface Sneaker {
    id: string;
    name: string;
    brand: string;
    price: number;
    releaseDate: string;
    description: string;
    image: string;
    sizes: number[];
    colors: string[];
    isRare?: boolean;
}

export type Theme = 'light' | 'dark';
