import { Classroom } from "./classroom.model";
import { User } from "./user.model";

export interface Student {
    id: number;
    userId:number;
    classroomId:number;
    user : User;
    classroom : Classroom;
}
