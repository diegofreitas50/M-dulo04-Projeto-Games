// import { Profile } from '../../profile/entities/profile.entity';
// import { Gender } from '../../gender/entities/gender.entity';

import { Gender } from "src/gender/entities/gender.entity";
import { Profile } from "src/profile/entities/profile.entity";

export class Game {
  id?: string;
  title: string;
  coverImageUrl: string;
  description: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;

  genders?: Gender[];
  profiles?: Profile[];

  createdAt?: Date;
  updatedAt?: Date;
}
