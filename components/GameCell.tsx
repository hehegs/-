
import React from 'react';
import type { BingoImage, GameState } from '../types';

interface GameCellProps {
  image: BingoImage;
  index: number;
  isMarked: boolean;
  gameState: GameState;
  onCellClick: (index: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
}

const GameCell: React.FC<GameCellProps> = ({
  image,
  index,
  isMarked,
  gameState,
  onCellClick,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const isSetup = gameState === 'setup';

  const handleClick = () => {
    if (gameState === 'playing' && !isMarked) {
      onCellClick(index);
    }
  };

  return (
    <div
      className={`relative aspect-square rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out ${
        isSetup ? 'cursor-grab active:cursor-grabbing hover:scale-105' : 'cursor-pointer'
      } ${isMarked ? 'transform scale-95' : ''}`}
      draggable={isSetup}
      onClick={handleClick}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      <img src={image.src} alt={`Bingo cell ${image.id}`} className="w-full h-full object-cover" />
      {isMarked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-4/5 h-4/5 border-8 border-red-500 rounded-full animate-ping-once"></div>
          <div className="w-4/5 h-4/5 border-8 border-red-500 rounded-full absolute"></div>
        </div>
      )}
       {isSetup && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default GameCell;
