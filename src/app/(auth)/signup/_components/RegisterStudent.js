import {
  getClassLevelList,
  getFacultyList,
  getSchoolList,
} from "@/api/academics";
import StudentForm from "./StudentForm";

const RegisterStudent = async () => {
  const [schoolsList, facultiesList, classLevelList] = await Promise.all([
    getSchoolList(),
    getFacultyList(),
    getClassLevelList(),
  ]);

  const institutes = schoolsList?.data ?? [];
  const faculties = facultiesList?.data ?? [];
  const classLevels = classLevelList?.data ?? [];
  console.log(institutes);

  return (
    <StudentForm
      institutes={institutes}
      faculties={faculties}
      classLevels={classLevels}
    />
  );
};

export default RegisterStudent;
