import {User} from "./user";
import {Race} from "./race";

export interface Category {
    url: string;
    name: string;
    short_name: string;
    slug: string;
    image?: string;
    owners: User[];
    moderators: User[];
}
