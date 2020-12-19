import {User} from "./user";
import {Race} from "./race";

export interface Category {
    name: string;
    short_name: string;
    slug: string;
    image: string;
    owners: User[];
    moderators: User[];
}
