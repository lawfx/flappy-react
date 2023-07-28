import { GameContext, GameState, GameStateAction } from "@/components/GameProvider/GameProvider";
import React from "react";

export default function useGameContext(): { state: GameState, dispatch: React.Dispatch<GameStateAction> } {
  return React.useContext<{ state: GameState, dispatch: React.Dispatch<GameStateAction> }>(GameContext);
}