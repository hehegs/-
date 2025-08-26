
import type { BingoImage } from './types';

export const INITIAL_IMAGES: BingoImage[] = [
    { id: 1, src: 'https://i.postimg.cc/QMJxbGJq/image.jpg' },
    { id: 2, src: 'https://i.postimg.cc/bNZrj5qz/image.jpg' },
    { id: 3, src: 'https://i.postimg.cc/sDbXfJ25/image.jpg' },
    { id: 4, src: 'https://i.postimg.cc/44LyqGkL/image.jpg' },
    { id: 5, src: 'https://i.postimg.cc/qvn7NCtS/image.jpg' },
    { id: 6, src: 'https://i.postimg.cc/hjCDkLwz/image.jpg' },
    { id: 7, src: 'https://i.postimg.cc/vB882qPw/image.jpg' },
    { id: 8, src: 'https://i.postimg.cc/1zQ3w5wt/image.jpg' },
    { id: 9, src: 'https://i.postimg.cc/1XfmsghW/image.jpg' },
];

export const WINNING_COMBINATIONS: number[][] = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
];
