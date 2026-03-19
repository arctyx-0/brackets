'use client';

import React from 'react';
import AllianceCell from './AllianceCell';

interface BracketDisplayProps {
  teams: Record<string, [string | null, string | null]>;
  winners: Record<string, number | null>;
  onMatchResult?: (matchId: string, winnerIdx: number) => void;
  readOnly?: boolean;
  keyWinners?: Record<string, number | null>;
}

const BracketDisplay: React.FC<BracketDisplayProps> = ({
  teams,
  winners,
  onMatchResult,
  readOnly = false,
  keyWinners
}) => {
  // Helper to handle match result updates
  const handleMatchResult = (matchId: string, winnerIdx: number) => {
    if (!readOnly && onMatchResult) {
      onMatchResult(matchId, winnerIdx);
    }
  };

  return (
    <div className="grid grid-cols-32 grid-rows-19 flex-grow border border-zinc-800 relative bg-black">
      <div className='col-start-1 col-end-23 row-span-1 float place-items-center align-items-center bg-gray-800'>
        <p className='text-5xl sm:text-3xl'>Upper Bracket</p>
      </div>

      <div className='col-start-23 col-end-33 row-span-1 float place-items-center align-items-center bg-red-950'>
        <p className='text-5xl sm:text-3xl'>Lower Bracket</p>
      </div>

      <p className="col-start-1 row-start-3 self-center text-center">1</p>
      <p className="col-start-1 row-start-6 self-center text-center">2</p>
      <p className="col-start-1 row-start-9 self-center text-center">3</p>
      <p className="col-start-1 row-start-12 self-center text-center">4</p>
      <p className="col-start-1 row-start-15 self-center text-center">5</p>
      <p className="col-start-1 row-start-18 self-center text-center">F</p>

      <div className='col-start-4 row-start-4 col-end-10 row end-4 border border-t-0'></div>
      <div className='col-start-6 col-end-6 row-start-5 row-end-5 border border-l-0 border-t-0 border-b-0'></div>

      <div className='col-start-16 row-start-4 col-end-22 row end-4 border border-t-0'></div>
      <div className='col-start-18 col-end-18 row-start-5 row-end-5 border border-l-0 border-t-0 border-b-0'></div>

      <div className='col-start-7 row-start-7 col-end-19 row end-7 border border-t-0'></div>
      <div className='col-start-12 col-end-12 row-start-8 row-end-12 border border-l-0 border-t-0 border-b-0'></div>

      <div className='col-start-24 row-start-7 col-end-25 row end-7 border border-t-0 border-l-0'></div>
      <div className='col-start-24 row-start-8 col-end-24 row end-8 border border-b-0 border-r-0 border-t-0'></div>

      <div className='col-start-30 row-start-7 col-end-30 row end-7 border border-t-0 border-l-0'></div>
      <div className='col-start-30 row-start-8 col-end-30 row end-8 border border-b-0 border-r-0 border-t-0'></div>

      <div className='col-start-24 row-start-10 col-end-30 row-end-10 border border-t-0'></div>
      <div className='col-start-26 col-end-26 row-start-11 row-end-11 border border-l-0 border-t-0 border-b-0'></div>

      <div className='col-start-26 col-end-26 row-start-13 row-end-15 border border-l-0 border-t-0 border-b-0'></div>
      <div className='col-start-12 col-end-12 row-start-13 row-end-17 border border-l-0 border-t-0 border-b-0'></div>
      <div className='col-start-13 row-start-16 col-end-27 row-end-16 border border-t-0 border-l-0'></div>
      <div className='col-start-16 col-end-16 row-start-17 row-end-17 border border-l-0 border-t-0 border-b-0'></div>

      <AllianceCell
        coords={[2, 6, 3, 3]}
        teams={teams.m1}
        winnerIdx={winners.m1}
        onMatchResult={(winnerIdx) => handleMatchResult('m1', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m1 ?? null}
      />
      <AllianceCell
        coords={[8, 12, 3, 3]}
        teams={teams.m2}
        winnerIdx={winners.m2}
        onMatchResult={(winnerIdx) => handleMatchResult('m2', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m2 ?? null}
      />
      <AllianceCell
        coords={[14, 18, 3, 3]}
        teams={teams.m3}
        winnerIdx={winners.m3}
        onMatchResult={(winnerIdx) => handleMatchResult('m3', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m3 ?? null}
      />
      <AllianceCell
        coords={[20, 24, 3, 3]}
        teams={teams.m4}
        winnerIdx={winners.m4}
        onMatchResult={(winnerIdx) => handleMatchResult('m4', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m4 ?? null}
      />

      <AllianceCell
        coords={[23, 27, 6, 6]}
        teams={teams.m5}
        winnerIdx={winners.m5}
        onMatchResult={(winnerIdx) => handleMatchResult('m5', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m5 ?? null}
      />
      <AllianceCell
        coords={[29, 33, 6, 6]}
        teams={teams.m6}
        winnerIdx={winners.m6}
        onMatchResult={(winnerIdx) => handleMatchResult('m6', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m6 ?? null}
      />

      <AllianceCell
        coords={[5, 9, 6, 6]}
        teams={teams.m9}
        winnerIdx={winners.m9}
        onMatchResult={(winnerIdx) => handleMatchResult('m9', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m9 ?? null}
      />
      <AllianceCell
        coords={[17, 21, 6, 6]}
        teams={teams.m10}
        winnerIdx={winners.m10}
        onMatchResult={(winnerIdx) => handleMatchResult('m10', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m10 ?? null}
      />

      <AllianceCell
        coords={[22, 26, 9, 9]}
        teams={teams.m7}
        winnerIdx={winners.m7}
        onMatchResult={(winnerIdx) => handleMatchResult('m7', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m7 ?? null}
      />
      <AllianceCell
        coords={[28, 32, 9, 9]}
        teams={teams.m8}
        winnerIdx={winners.m8}
        onMatchResult={(winnerIdx) => handleMatchResult('m8', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m8 ?? null}
      />

      <AllianceCell
        coords={[11, 15, 12, 12]}
        teams={teams.m11}
        winnerIdx={winners.m11}
        onMatchResult={(winnerIdx) => handleMatchResult('m11', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m11 ?? null}
      />
      <AllianceCell
        coords={[25, 29, 12, 12]}
        teams={teams.m12}
        winnerIdx={winners.m12}
        onMatchResult={(winnerIdx) => handleMatchResult('m12', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m12 ?? null}
      />

      <AllianceCell
        coords={[25, 29, 15, 15]}
        teams={teams.m13}
        winnerIdx={winners.m13}
        onMatchResult={(winnerIdx) => handleMatchResult('m13', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m13 ?? null}
      />
      <AllianceCell
        coords={[15, 19, 18, 18]}
        teams={teams.m14}
        winnerIdx={winners.m14}
        onMatchResult={(winnerIdx) => handleMatchResult('m14', winnerIdx)}
        readOnly={readOnly}
        keyWinnerIdx={keyWinners?.m14 ?? null}
      />
    </div>
  );
};

export default BracketDisplay;
