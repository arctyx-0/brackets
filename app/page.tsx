'use client';
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { db } from "./components/firebase";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import BracketDisplay from "./components/BracketDisplay";

const COMP_ID = "2026pncmp";

async function Submit(submissionData: { user: any; bracket: any; }) {
  await addDoc(collection(db, "brackets"), {
    name: submissionData.user,
    bracket: submissionData.bracket,
    createdAt: new Date()
  });
}

export default function Bracket() {
  const [userName, setUserName] = useState("");
  const [teams, setTeams] = useState<Record<string, [string | null, string | null]>>({
    m1: ["A1", "A8"], m2: ["A4", "A5"], m3: ["A2", "A7"], m4: ["A3", "A6"],
    m5: [null, null], m6: [null, null], m7: [null, null], m8: [null, null],
    m9: [null, null], m10: [null, null], m11: [null, null], m12: [null, null],
    m13: [null, null], m14: [null, null]
  });

  const [winners, setWinners] = useState<Record<string, number | null>>({
    m1: null, m2: null, m3: null, m4: null, m5: null, m6: null, m7: null,
    m8: null, m9: null, m10: null, m11: null, m12: null, m13: null, m14: null
  });

  const [alliances, setAlliances] = useState<Array<{allianceNumber: number; teams: string[]}>>([]);
  const [alliancesLoading, setAlliancesLoading] = useState(true);

  useEffect(() => {
    const fetchAlliances = async () => {
      try {
        console.log("Fetching alliances for competition ID:", COMP_ID);

        const alliancesRef = collection(db, "alliances");
        const q = query(alliancesRef);
        const querySnapshot = await getDocs(q);

        console.log(`Found ${querySnapshot.size} documents in alliances collection`);

        const allAlliances: Array<{allianceNumber: number; teams: string[]}> = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document:", doc.id, "Data:", JSON.stringify(data, null, 2));

          // Check if data matches expected structure
          if (data.compId === COMP_ID && data.alliances) {
            console.log(`Document ${doc.id} matches compId ${COMP_ID}`);
            data.alliances.forEach((alliance: any) => {
              console.log(`Found alliance ${alliance.allianceNumber} with teams:`, alliance.teams);
              allAlliances.push({
                allianceNumber: alliance.allianceNumber,
                teams: alliance.teams || []
              });
            });
          } else {
            console.log(`Document ${doc.id} does NOT match - compId: ${data.compId}, has alliances field: ${!!data.alliances}`);
          }
        });

        console.log(`Total alliances found for ${COMP_ID}: ${allAlliances.length}`);
        setAlliances(allAlliances.sort((a, b) => a.allianceNumber - b.allianceNumber));
        setAlliancesLoading(false);
      } catch (err) {
        console.error("Error fetching alliances:", err);
        setAlliancesLoading(false);
      }
    };

    fetchAlliances();
  }, []);

  const updateMatch = (matchId: string, winIdx: number, nextWinner?: [string, number], nextLoser?: [string, number]) => {
    const currentTeams = (teams as any)[matchId];
    const winVal = currentTeams[winIdx]!;
    const loseVal = currentTeams[winIdx === 0 ? 1 : 0]!;

    setWinners(prev => ({ ...prev, [matchId]: winIdx }));

    if (nextWinner && nextWinner[0] !== '') {
      setTeams(prev => {
        const currentValue = (prev as any)[nextWinner[0]] as [any, any] | undefined;
        const next: [string | null, string | null] = currentValue ? [currentValue[0], currentValue[1]] : [null, null];
        next[nextWinner[1]] = winVal;
        const result = { ...prev };
        result[nextWinner[0]] = next;
        return result;
      });
    }

    if (nextLoser && nextLoser[0] !== '') {
      setTeams(prev => {
        const currentValue = (prev as any)[nextLoser[0]] as [any, any] | undefined;
        const next: [string | null, string | null] = currentValue ? [currentValue[0], currentValue[1]] : [null, null];
        next[nextLoser[1]] = loseVal;
        const result = { ...prev };
        result[nextLoser[0]] = next;
        return result;
      });
    }
  };

  const handleUpdateMatch = (matchId: string, teamIdx: number) => {
    const matchFlow = {
      m1: { winnerNext: ['m9', 0] as [string, number], loserNext: ['m5', 0] as [string, number] },
      m2: { winnerNext: ['m9', 1] as [string, number], loserNext: ['m5', 1] as [string, number] },
      m3: { winnerNext: ['m10', 0] as [string, number], loserNext: ['m6', 0] as [string, number] },
      m4: { winnerNext: ['m10', 1] as [string, number], loserNext: ['m6', 1] as [string, number] },
      m5: { winnerNext: ['m7', 1] as [string, number], loserNext: null },
      m6: { winnerNext: ['m8', 1] as [string, number], loserNext: null },
      m9: { winnerNext: ['m11', 0] as [string, number], loserNext: ['m8', 0] as [string, number] },
      m10: { winnerNext: ['m11', 1] as [string, number], loserNext: ['m7', 0] as [string, number] },
      m7: { winnerNext: ['m12', 0] as [string, number], loserNext: null },
      m8: { winnerNext: ['m12', 1] as [string, number], loserNext: null },
      m11: { winnerNext: ['m14', 0] as [string, number], loserNext: ['m13', 0] as [string, number] },
      m12: { winnerNext: ['m13', 1] as [string, number], loserNext: ['', 0] as [string, number] },
      m13: { winnerNext: ['m14', 1] as [string, number], loserNext: null },
      m14: { winnerNext: null, loserNext: null }
    };

    const flow = matchFlow[matchId as keyof typeof matchFlow];
    const winnerNext = flow.winnerNext;
    const loserNext = flow.loserNext;

    updateMatch(matchId, teamIdx, winnerNext ?? undefined, loserNext ?? undefined);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const submissionData = {
      user: userName,
      bracket: { teams, winners }
    };
    const button = document.getElementById('submitButton') as HTMLButtonElement | null;
    if (button){
      button.disabled = true
    }
    try {
      await Submit(submissionData);
      console.log("submitted");
      setUserName("");
      setTeams({
        m1: ["A1", "A8"], m2: ["A4", "A5"], m3: ["A2", "A7"], m4: ["A3", "A6"],
        m5: [null, null], m6: [null, null], m7: [null, null], m8: [null, null],
        m9: [null, null], m10: [null, null], m11: [null, null], m12: [null, null],
        m13: [null, null], m14: [null, null]
      } as Record<string, [string | null, string | null]>);
      setWinners({
        m1: null, m2: null, m3: null, m4: null, m5: null, m6: null, m7: null,
        m8: null, m9: null, m10: null, m11: null, m12: null, m13: null, m14: null
      });
      window.location.assign("/bracketResults")

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-screen w-screen bg-black text-white p-4 flex flex-col">
      {/* Alliance Display Section */}
      <div className="mb-6 p-4 bg-zinc-900 rounded-lg border border-zinc-700">
        <h2 className="text-2xl font-bold mb-4 text-white">Alliances</h2>
        {alliancesLoading ? (
          <div className="text-zinc-400">Loading alliances...</div>
        ) : alliances.length === 0 ? (
          <div className="text-zinc-400">No alliances found</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {alliances.map((alliance) => (
              <div key={alliance.allianceNumber} className="bg-zinc-800 p-3 rounded border border-zinc-600">
                <div className="font-bold text-blue-400 mb-2">Alliance {alliance.allianceNumber}</div>
                <div className="space-y-1">
                  {alliance.teams.length > 0 ? (
                    alliance.teams.map((team, idx) => (
                      <div key={idx} className="text-sm text-zinc-300">
                        Team {team}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-zinc-500">No teams</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name field */}
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="userName" className="text-xl font-bold">Name:</label>
        <input
          id="userName"
          type="text"
          required
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          placeholder="Enter your name..."
          className="bg-zinc-800 border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-64"
        />
        <button
          type="button"
          onClick={() => window.location.assign("/bracketResults")}
          className="px-12 py-3 font-bold rounded shadow-lg transition-all text-lg uppercase tracking-wider bg-zinc-700 hover:bg-zinc-600 text-white"
        >
          View Results
        </button>
      </div>

      <BracketDisplay
        teams={teams}
        winners={winners}
        onMatchResult={handleUpdateMatch}
        readOnly={false}
      />
      <div className="mt-4 flex justify-center bg-black gap-4">
        <button type="submit" id='submitButton' className="px-12 py-3 font-bold rounded shadow-lg transition-all text-lg uppercase tracking-wider bg-blue-600 hover:bg-blue-700">
          Submit Entry
        </button>
      </div>
    </form>
  );
}
