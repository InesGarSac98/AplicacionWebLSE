import { Student } from "./student.model";
import { Teacher } from "./teacher.model";
import { User } from "./user.model";

export interface StudentAvailableGame {
    id: number;
    userId:number;
    studentId:number;
    teacherId:number;
    user : User;
    student : Student;
    teacher : Teacher;
}
