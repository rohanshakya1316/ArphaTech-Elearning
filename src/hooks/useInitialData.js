import {
  getClassLevelList,
  getFacultyList,
  getSchoolList,
  getSubjectList,
} from "@/api/academics";
import { useState, useEffect } from "react";

export const useInitialData = () => {
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [classLevels, setClassLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          subjectsListResponse,
          schoolsListResponse,
          facultiesListResponse,
          classLevelsListResponse,
        ] = await Promise.all([
          getSubjectList(),
          getSchoolList(),
          getFacultyList(),
          getClassLevelList(),
        ]);

        setSubjects(subjectsListResponse.data);
        setFaculties(facultiesListResponse.data);
        setInstitutes(schoolsListResponse.data);
        setClassLevels(classLevelsListResponse.data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { subjects, faculties, institutes, classLevels, loading, error };
};
