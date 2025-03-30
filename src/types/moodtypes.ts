import AngrySVG from "../resources/Angry_Emoji.svg";
import SadSVG from "../resources/Sad_Emoji.svg";
import NeutralSVG from "../resources/Neutro_Emoji.svg";
import HappySVG from "../resources/Happy_Emoji.svg";
import VeryHappySVG from "../resources/Very_Happy_Emoji.svg";

export enum Mood {
  Angry = "angry",
  Sad = "sad",
  Neutral = "neutral",
  Happy = "happy",
  VeryHappy = "very_happy",
}

export const moods = [
  { src: AngrySVG, value: Mood.Angry },
  { src: SadSVG, value: Mood.Sad },
  { src: NeutralSVG, value: Mood.Neutral },
  { src: HappySVG, value: Mood.Happy },
  { src: VeryHappySVG, value: Mood.VeryHappy },
] as const;
