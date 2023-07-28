import { CollisionDetectionAction, CollisionDetectionContext, CollisionDetectionState } from "@/components/CollisionDetectionProvider/CollisionDetectionProvider";
import React from "react";

export default function useCollisionDetectionContext(): [CollisionDetectionState, React.Dispatch<CollisionDetectionAction>] {
  return React.useContext(CollisionDetectionContext);
}