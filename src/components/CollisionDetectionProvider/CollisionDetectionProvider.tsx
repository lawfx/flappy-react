import useGameContext from "@/hooks/useGameContext";
import React, { ReactNode } from "react";
import { GameStateActionType, GameStatus } from "../GameProvider/GameProvider";
import { areElementsOverlapping } from "@/helpers/helpers";

interface CollisionDetectionProviderProps {
  children: ReactNode;
}

interface Obstacle {
  id: number;
  topRef: HTMLElement | null;
  bottomRef: HTMLElement | null;
  scoreAreaRef: HTMLElement | null;
}

interface CollisionDetectionState {
  characterRef: HTMLElement | null;
  obstacles: Obstacle[];
}

enum CollisionDetectionActionType {
  SetCharacter,
  AddObstacle,
  RemoveObstacle
}

type CollisionDetectionAction =
  CollisionDetectionActionSetCharacter |
  CollisionDetectionActionAddObstacle |
  CollisionDetectionActionRemoveObstacle;

interface CollisionDetectionActionSetCharacter {
  type: CollisionDetectionActionType.SetCharacter;
  ref: HTMLElement | null;
}

interface CollisionDetectionActionAddObstacle {
  type: CollisionDetectionActionType.AddObstacle;
  id: number;
  topRef: HTMLElement | null;
  bottomRef: HTMLElement | null;
  scoreAreaRef: HTMLElement | null;
}

interface CollisionDetectionActionRemoveObstacle {
  type: CollisionDetectionActionType.RemoveObstacle;
  id: number;
}

function reducer(state: CollisionDetectionState, action: CollisionDetectionAction): CollisionDetectionState {
  switch (action.type) {
    case CollisionDetectionActionType.SetCharacter:
      return { ...state, characterRef: action.ref };

    case CollisionDetectionActionType.AddObstacle:
      return { ...state, obstacles: [...state.obstacles, { id: action.id, topRef: action.topRef, bottomRef: action.bottomRef, scoreAreaRef: action.scoreAreaRef }] };

    case CollisionDetectionActionType.RemoveObstacle:
      return { ...state, obstacles: state.obstacles.filter(o => o.id !== action.id) };
  }
}

const CollisionDetectionContext = React.createContext<[CollisionDetectionState, React.Dispatch<CollisionDetectionAction>]>([] as any);

export default function CollisionDetectionProvider({ children }: CollisionDetectionProviderProps) {

  const [gameState, gameStateDispatch] = useGameContext();
  const [state, dispatch] = React.useReducer(reducer, {
    characterRef: null,
    obstacles: []
  });

  const gameStatus = gameState.status;

  React.useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    function checkCollisions() {
      if (!state.obstacles.length) return;

      const firstObstacle = state.obstacles[0];
      if (!firstObstacle || !state.characterRef) return;

      checkScoreArea(firstObstacle.scoreAreaRef!);
      checkObstacles(firstObstacle);
    }

    function checkScoreArea(scoreArea: HTMLElement) {
      if (!areElementsOverlapping(scoreArea, state.characterRef!)) return;

      gameStateDispatch({ type: GameStateActionType.IncreaseScore });
      dispatch({ type: CollisionDetectionActionType.RemoveObstacle, id: state.obstacles[0].id });
    }

    function checkObstacles(obstacle: Obstacle) {
      if (!areElementsOverlapping(obstacle.bottomRef!, state.characterRef!) && !areElementsOverlapping(obstacle.topRef!, state.characterRef!)) return;

      gameStateDispatch({ type: GameStateActionType.EndGame });
      dispatch({ type: CollisionDetectionActionType.RemoveObstacle, id: state.obstacles[0].id });
    }

    const intervalId = setInterval(() => {
      checkCollisions();
    }, 100);

    return () => clearInterval(intervalId);
  }, [state, gameStatus]);

  return (
    <CollisionDetectionContext.Provider value={[state, dispatch]}>
      {children}
    </CollisionDetectionContext.Provider>
  );
}

export { CollisionDetectionContext, CollisionDetectionActionType };
export type { CollisionDetectionAction, CollisionDetectionState };
