export enum Mood {
  Angry = "angry",
  Sad = "sad",
  Neutral = "neutral",
  Happy = "happy",
  VeryHappy = "very_happy",
}

export const moods = [
  { src: "/resources/Angry_Emoji.svg", value: Mood.Angry },
  { src: "/resources/Sad_Emoji.svg", value: Mood.Sad },
  { src: "/resources/Neutro_Emoji.svg", value: Mood.Neutral },
  { src: "/resources/Happy_Emoji.svg", value: Mood.Happy },
  { src: "/resources/Very_Happy_Emoji.svg", value: Mood.VeryHappy },
] as const;
