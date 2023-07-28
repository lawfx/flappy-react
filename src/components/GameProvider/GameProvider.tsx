import React, { ReactNode } from "react";

interface GameProviderProps {
  children: ReactNode;
}

enum GameStatus {
  Waiting,
  Playing,
  Ended
}

interface GameState {
  status: GameStatus;
  currentScore: number;
  highestScore: number;
}

enum GameStateActionType {
  StartGame,
  EndGame,
  IncreaseScore
}

interface GameStateAction {
  type: GameStateActionType;
}

function reducer(state: GameState, action: GameStateAction): GameState {
  switch (action.type) {
    case GameStateActionType.StartGame:
      return { ...state, status: GameStatus.Playing, currentScore: 0 };
    case GameStateActionType.EndGame:
      const newHighscore = state.currentScore > state.highestScore ? state.currentScore : state.highestScore;
      return { ...state, status: GameStatus.Ended, highestScore: newHighscore };
    case GameStateActionType.IncreaseScore:
      return { ...state, currentScore: state.currentScore + 1 };
  }
}

const GameContext = React.createContext<{ state: GameState, dispatch: React.Dispatch<GameStateAction> }>({} as any);

export default function GameProvider({ children }: GameProviderProps) {

  const [state, dispatch] = React.useReducer(reducer, { status: GameStatus.Waiting, currentScore: 0, highestScore: 0 });

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameStatus, GameStateActionType };
export type { GameState, GameStateAction };
