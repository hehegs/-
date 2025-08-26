
import React from 'react';
import type { BingoImage, GameState } from '../types';
import GameCell from './GameCell';

interface GameBoardProps {
  images: BingoImage[];
  gameState: GameState;
  markedIndices: Set<number>;
  onCellClick: (index: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  images,
  gameState,
  markedIndices,
  onCellClick,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-3xl shadow-2xl backdrop-blur-sm">
      {images.map((image, index) => (
        <GameCell
          key={image.id}
          image={image}
          index={index}
          isMarked={markedIndices.has(index)}
          gameState={gameState}
          onCellClick={onCellClick}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default GameBoard;
