import { GameContext, GameState, GameStateAction } from "@/components/GameProvider/GameProvider";
import React from "react";

export default function useGameContext(): [GameState, React.Dispatch<GameStateAction>] {
  return React.useContext(GameContext);
}