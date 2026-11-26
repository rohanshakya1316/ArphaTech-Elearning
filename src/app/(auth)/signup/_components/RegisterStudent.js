"use client";
import { useInitialData } from "@/hooks/useInitialData";
import StudentForm from "./StudentForm";

const RegisterStudent = () => {
  const { institutes, faculties, classLevels } = useInitialData();

  return (
    <StudentForm
      institutes={institutes}
      faculties={faculties}
      classLevels={classLevels}
    />
  );
};

export default RegisterStudent;
