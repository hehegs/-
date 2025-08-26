
import React, { useState, useEffect, useCallback } from 'react';
import type { BingoImage, GameState } from './types';
import { INITIAL_IMAGES, WINNING_COMBINATIONS } from './constants';
import GameBoard from './components/GameBoard';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [boardImages, setBoardImages] = useState<BingoImage[]>(() => shuffleArray([...INITIAL_IMAGES]));
  const [markedIndices, setMarkedIndices] = useState<Set<number>>(new Set());
  const [bingoCount, setBingoCount] = useState<number>(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const calculateBingoCount = useCallback(() => {
    let count = 0;
    for (const combination of WINNING_COMBINATIONS) {
      if (combination.every(index => markedIndices.has(index))) {
        count++;
      }
    }
    setBingoCount(count);
  }, [markedIndices]);

  useEffect(() => {
    if (gameState === 'playing') {
      calculateBingoCount();
    }
  }, [markedIndices, gameState, calculateBingoCount]);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleNewGame = () => {
    setBoardImages(shuffleArray([...INITIAL_IMAGES]));
    setMarkedIndices(new Set());
    setBingoCount(0);
    setGameState('setup');
  };

  const handleCellClick = (index: number) => {
    if (gameState === 'playing' && !markedIndices.has(index)) {
      setMarkedIndices(prev => new Set(prev).add(index));
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (gameState === 'setup') {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newBoardImages = [...boardImages];
    const draggedItem = newBoardImages[draggedIndex];
    newBoardImages.splice(draggedIndex, 1);
    newBoardImages.splice(dropIndex, 0, draggedItem);

    setBoardImages(newBoardImages);
    setDraggedIndex(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center p-4 text-slate-800">
      <main className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-5xl font-black text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Image Bingo Fun</h1>
          <p className="text-lg text-white/90 mt-2 font-semibold" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
            {gameState === 'setup' ? 'Drag to arrange your board, then start!' : 'Click the images to get a BINGO!'}
          </p>
        </header>
        
        <GameBoard
          images={boardImages}
          gameState={gameState}
          markedIndices={markedIndices}
          onCellClick={handleCellClick}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />

        {gameState === 'setup' && (
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Start Game!
          </button>
        )}

        {gameState === 'playing' && (
          <footer className="w-full flex justify-between items-center px-2">
            <button
              onClick={handleNewGame}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              New Game
            </button>
            <div className="text-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner">
              <span className="text-2xl font-black text-yellow-500">{bingoCount}</span>
              <span className="font-semibold ml-2">BINGO!</span>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};

export default App;
