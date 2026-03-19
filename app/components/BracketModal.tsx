'use client';

import React, { useEffect } from 'react';
import BracketDisplay from './BracketDisplay';

interface BracketModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  bracket: {
    teams: Record<string, [string | null, string | null]>;
    winners: Record<string, number | null>;
  };
  keyBracket?: {
    teams: Record<string, [string | null, string | null]>;
    winners: Record<string, number | null>;
  };
}

const BracketModal: React.FC<BracketModalProps> = ({ isOpen, onClose, name, bracket, keyBracket }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-lg max-w-full max-h-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '95%', height: '95%' }}
      >
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{name}'s Bracket</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-3xl font-bold leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(100% - 80px)' }}>
          <BracketDisplay
            teams={bracket.teams}
            winners={bracket.winners}
            keyWinners={keyBracket?.winners}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BracketModal;
