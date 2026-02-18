import playersData from './nbaData.json';
import wnbaPlayersData from './wnbaData.json';
import sneakersData from './sneakers.json';
import type { Player, Sneaker } from '../types';

export const PLAYERS: Player[] = playersData as Player[];
export const WNBA_PLAYERS: Player[] = wnbaPlayersData as Player[];
export const SNEAKERS: Sneaker[] = sneakersData as Sneaker[];
