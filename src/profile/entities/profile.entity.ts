import { GamesProfile } from "src/games-profile/entities/games-profile.entity";
import { User } from "src/user/entities/user.entity";


export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  userId: User;
  games?: GamesProfile[];
  createdAt?: Date;
  updatedAt?: Date;
}
