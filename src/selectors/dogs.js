
import { createSelector } from "reselect"


const getDogs = (dogs) => dogs

export const getSires = createSelector(
  [getDogs],
  (dogs) => dogs.filter(d => d.get("gender") === "D")
)

export const getDams = createSelector(
  [getDogs],
  (dogs) => dogs.filter(d => d.get("gender") === "B")
)
