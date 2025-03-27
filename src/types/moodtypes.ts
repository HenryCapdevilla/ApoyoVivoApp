// src/moodTypes.ts

export enum Mood {
  Angry = "angry",
  Sad = "sad",
  Neutral = "neutral",
  Happy = "happy",
  VeryHappy = "very_happy",
}

export const moods = [
  { emoji: "😡", color: "bg-red-500", value: Mood.Angry },
  { emoji: "😢", color: "bg-blue-500", value: Mood.Sad },
  { emoji: "😐", color: "bg-pink-500", value: Mood.Neutral },
  { emoji: "😊", color: "bg-green-500", value: Mood.Happy },
  { emoji: "😁", color: "bg-yellow-500", value: Mood.VeryHappy },
];
