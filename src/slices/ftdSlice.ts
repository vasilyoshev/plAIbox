import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Difficulty, GameStatus, Style } from "enums";
import { MaskCircle } from "interfaces";
import { difficultyToLivesMap } from "utils";
import { RootState } from "store";

export interface FtdState {
  gameStatus: GameStatus;
  level: number;
  lives: number;
  differences: MaskCircle[];
  style: Style;
  topic: string;
  difficulty: Difficulty;
}

export const initialState: FtdState = {
  gameStatus: GameStatus.Waiting,
  level: 1,
  lives: 5,
  differences: [],
  style: undefined,
  topic: undefined,
  difficulty: Difficulty.Normal,
};

export const ftdSlice = createSlice({
  name: "ftd",
  initialState,
  reducers: {
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    levelUp: (state) => {
      state.level++;
    },
    loseLife: (state) => {
      state.lives--;
    },
    setDifferences: (state, action: PayloadAction<MaskCircle[]>) => {
      state.differences = action.payload;
    },
    setDifferenceClickedById: (state, action: PayloadAction<number>) => {
      const circle = state.differences.find((circle) => circle.id === action.payload);
      if (circle) {
        circle.isClicked = true;
      }
    },
    setStyle: (state, action: PayloadAction<Style>) => {
      state.style = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    resetLevelState: (state) => {
      state.gameStatus = initialState.gameStatus;
      state.lives = difficultyToLivesMap[state.difficulty];
      state.differences = initialState.differences;
    },
    resetGameState: (state) => {
      state.gameStatus = initialState.gameStatus;
      state.lives = difficultyToLivesMap[state.difficulty];
      state.differences = initialState.differences;
      state.level = 1;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
      state.lives = difficultyToLivesMap[state.difficulty];
    },
  },
});

export const {
  setGameStatus,
  levelUp,
  loseLife,
  setDifferences,
  setDifferenceClickedById,
  setStyle,
  setTopic,
  resetLevelState,
  resetGameState,
  setDifficulty,
} = ftdSlice.actions;

export const selectGameStatus = (state: RootState) => state.ftd.gameStatus;
export const selectLevel = (state: RootState) => state.ftd.level;
export const selectLives = (state: RootState) => state.ftd.lives;
export const selectDifferences = (state: RootState) => state.ftd.differences;
export const selectStyle = (state: RootState) => state.ftd.style;
export const selectTopic = (state: RootState) => state.ftd.topic;
export const selectDifficulty = (state: RootState) => state.ftd.difficulty;

export default ftdSlice.reducer;
