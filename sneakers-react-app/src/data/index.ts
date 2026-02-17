import playersData from './nbaData.json';
import sneakersData from './sneakers.json';
import type { Player, Sneaker } from '../types';

export const PLAYERS: Player[] = playersData as Player[];
export const SNEAKERS: Sneaker[] = sneakersData as Sneaker[];
