'use client';

import React from 'react';

interface AllianceCellProps {
  coords: [number, number, number, number];
  teams: [string | null, string | null];
  winnerIdx: number | null;
  onMatchResult?: (winnerIdx: number) => void;
  readOnly?: boolean;
  keyWinnerIdx?: number | null;
}

const AllianceCell: React.FC<AllianceCellProps> = ({
  coords,
  teams,
  winnerIdx,
  onMatchResult,
  readOnly = false,
  keyWinnerIdx
}) => {
  const [cs, ce, rs, re] = coords;
  const [t1, t2] = teams;

  const gridStyle = {
    gridColumn: `${cs} / ${ce}`,
    gridRow: `${rs} / ${re + 1}`,
  };

  // Determine button styling based on correctness vs key bracket
  const getButtonClass = (buttonIdx: number) => {
    const isSelected = winnerIdx === buttonIdx;
    const isCorrect = keyWinnerIdx !== null && keyWinnerIdx !== undefined &&
                      keyWinnerIdx === buttonIdx && isSelected;
    const isWrong = keyWinnerIdx !== null && keyWinnerIdx !== undefined &&
                    keyWinnerIdx !== buttonIdx && isSelected;

    if (isCorrect) {
      return 'bg-green-600 border-white font-bold';
    } else if (isWrong) {
      return 'bg-red-600 border-white font-bold';
    } else if (readOnly) {
      return 'border-zinc-700 text-white';
    } else {
      return 'border-zinc-700 text-white hover:bg-zinc-800';
    }
  };

  return (
    <div style={gridStyle} className="border border-white flex flex-col justify-center items-center gap-1 p-1 bg-zinc-900">
      <button
        type="button"
        disabled={!t1 || !t2 || readOnly}
        onClick={() => !readOnly && onMatchResult?.(0)}
        className={`w-full h-1/2 flex items-center justify-center border text-[10px] transition-all font-bold ${getButtonClass(0)}`}>
        {t1}
      </button>
      <button
        type="button"
        disabled={!t1 || !t2 || readOnly}
        onClick={() => !readOnly && onMatchResult?.(1)}
        className={`w-full h-1/2 flex items-center justify-center border text-[10px] transition-all font-bold ${getButtonClass(1)}`}>
        {t2}
      </button>
    </div>
  );
};

export default AllianceCell;
