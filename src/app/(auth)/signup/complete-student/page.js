import RegisterStudent from "../_components/RegisterStudent";

// RegisterStudent is an async server component that fetches schools, faculties
// and class levels from the API on every request, so this route must be
// rendered dynamically instead of being prerendered at build time.
export const dynamic = "force-dynamic";

const CompleteStudentSignUp = () => {
  return <RegisterStudent />;
};

export default CompleteStudentSignUp;

