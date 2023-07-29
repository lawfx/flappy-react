import React, { ReactNode } from "react";

interface GameProviderProps {
  children: ReactNode;
}

enum GameStatus {
  Waiting,
  Playing,
  Ended,
  Reset //single frame status for cleaning things up
}

interface GameState {
  status: GameStatus;
  currentScore: number;
  highestScore: number;
}

enum GameStateActionType {
  StartGame,
  EndGame,
  ResetGame,
  RestartGame,
  IncreaseScore
}

interface GameStateAction {
  type: GameStateActionType;
}

function reducer(state: GameState, action: GameStateAction): GameState {
  switch (action.type) {
    case GameStateActionType.StartGame:
      return { ...state, status: GameStatus.Playing };
    case GameStateActionType.EndGame:
      const newHighscore = state.currentScore > state.highestScore ? state.currentScore : state.highestScore;
      return { ...state, status: GameStatus.Ended, highestScore: newHighscore };
    case GameStateActionType.IncreaseScore:
      return { ...state, currentScore: state.currentScore + 1 };
    case GameStateActionType.ResetGame:
      return { ...state, currentScore: 0, status: GameStatus.Reset };
    case GameStateActionType.RestartGame:
      return { ...state, status: GameStatus.Waiting };
  }
}

const GameContext = React.createContext<[GameState, React.Dispatch<GameStateAction>]>([] as any);

export default function GameProvider({ children }: GameProviderProps) {

  const [state, dispatch] = React.useReducer(reducer, { status: GameStatus.Waiting, currentScore: 0, highestScore: 0 });

  React.useEffect(() => {
    if (state.status !== GameStatus.Reset) return;
    dispatch({ type: GameStateActionType.RestartGame });
  }, [state.status]);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameStatus, GameStateActionType };
export type { GameState, GameStateAction };
