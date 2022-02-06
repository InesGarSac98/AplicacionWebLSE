import { Student } from "./student.model";
import { Teacher } from "./teacher.model";

export interface Classroom{
    id: number;
    teacherId:number;
    name: string,
    classroomCode: string,
    teacher : Teacher;
    students: Student[];
}
