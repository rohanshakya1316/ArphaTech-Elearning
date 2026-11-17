import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  MonitorPlay,
  FileText,
  Clock3,
  Star,
  Users,
  Code2,
  BriefcaseBusiness,
  Palette,
  Calculator,
  CheckCircle2,
  Play,
  Bookmark,
  MoveRight,
  Sparkles,
  Globe2,
  Library,
} from "lucide-react";

const categories = [
  {
    name: "Programming",
    description: "Build your technical skills",
    count: "24 Courses",
    icon: Code2,
  },
  {
    name: "Business",
    description: "Learn business essentials",
    count: "18 Courses",
    icon: BriefcaseBusiness,
  },
  {
    name: "Design",
    description: "Turn creativity into skills",
    count: "16 Courses",
    icon: Palette,
  },
  {
    name: "Mathematics",
    description: "Strengthen your foundations",
    count: "12 Courses",
    icon: Calculator,
  },
];

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Alex Morgan",
    category: "Development",
    lessons: 42,
    duration: "18 hours",
    rating: "4.9",
    students: "2.4k",
    price: "Free",
    icon: Code2,
    theme: "bg-[#800000]",
    level: "Beginner",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Wilson",
    category: "Creative Design",
    lessons: 28,
    duration: "12 hours",
    rating: "4.8",
    students: "1.8k",
    price: "Free",
    icon: Palette,
    theme: "bg-[#315b78]",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    instructor: "David Cooper",
    category: "Data Science",
    lessons: 36,
    duration: "20 hours",
    rating: "4.9",
    students: "3.1k",
    price: "Free",
    icon: Calculator,
    theme: "bg-[#96702a]",
    level: "Intermediate",
  },
];

const benefits = [
  {
    number: "01",
    icon: BookOpen,
    title: "Quality learning resources",
    description:
      "Access organized notes, study materials, and educational resources that make complex subjects easier to understand.",
  },
  {
    number: "02",
    icon: MonitorPlay,
    title: "Learn at your own pace",
    description:
      "Explore courses and educational content whenever and wherever it suits your learning schedule.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Develop practical skills",
    description:
      "Build knowledge and confidence through structured learning and resources designed around real-world skills.",
  },
];

const SectionHeading = ({ eyebrow, title, description, link, href }) => {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary">
          {eyebrow}
        </span>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading] sm:text-3xl lg:text-[36px]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-body sm:text-base">
          {description}
        </p>
      </div>

      {link && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
        >
          {link}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
};

const HeroVisual = () => {
  return (
    <div className="relative mx-auto w-full max-w-127.5 lg:ml-auto">
      {/* Main visual */}
      <div className="relative overflow-hidden rounded-2xl border border-[#e8d9d5] bg-[#f0e8e5] p-5 sm:p-8">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-[#80000020]" />
        <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full border border-[#80000020]" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
              YOUR LEARNING SPACE
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
              Make today count.
            </h3>
            <p className="mt-1 text-xs text-[#64748b]">
              Discover something new every day.
            </p>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-primary shadow-sm">
            <GraduationCap size={25} />
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative z-10 mt-9 rounded-xl border border-[#e8e5e3] bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[1.7px] text-[#94a3b8]">
                FEATURED LEARNING
              </span>
              <h4 className="mt-1.5 text-base font-bold text-[#0f172a]">
                Expand your knowledge
              </h4>
            </div>

            <ArrowUpRight className="text-primary" size={20} />
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-lg bg-[#f8f5f4] p-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <Code2 size={34} strokeWidth={1.5} />
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">
                POPULAR CATEGORY
              </span>
              <h3 className="mt-1 text-sm font-bold text-[#0f172a] sm:text-base">
                Web Development
              </h3>
              <p className="mt-1 text-xs text-[#64748b]">
                Learn. Build. Create.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#edf0f3] pt-4">
            <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
              <BookOpen size={15} className="text-primary" />
              Structured lessons
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
              <CheckCircle2 size={15} className="text-primary" />
              Learn at your pace
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-primary shadow-sm">
            <Bookmark size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0f172a]">Keep learning</p>
            <p className="mt-0.5 text-[10px] text-[#64748b]">
              Your next chapter awaits.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative side detail */}
      <div className="absolute -bottom-5 -right-3 -z-10 h-32 w-32 rounded-2xl border border-[#80000020] sm:-right-5" />
    </div>
  );
};

const CourseCard = ({ course }) => {
  const Icon = course.icon;

  return (
    <article className="group overflow-hidden rounded-xl border border-[#e7eaf0] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#80000040] hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden ${course.theme} text-white sm:h-48`}
      >
        <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-white/15" />
        <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-white/15" />

        <Icon
          size={76}
          strokeWidth={1.15}
          className="relative z-10 opacity-90 transition-transform duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#0f172a]">
          {course.category}
        </span>

        <span className="absolute bottom-4 right-4 rounded bg-black/20 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {course.level}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] text-[#94a3b8]">
          <GraduationCap size={15} />
          {course.instructor}
        </div>

        <h3 className="mt-3 min-h-12 text-base font-bold leading-6 text-[#0f172a]">
          {course.title}
        </h3>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#edf0f3] pb-4 text-[11px] text-[#64748b]">
          <span className="flex items-center gap-1.5">
            <FileText size={14} />
            {course.lessons} Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {course.duration}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs">
            <Star size={15} className="fill-[#fbbf24] text-[#d49a19]" />
            <strong className="text-[#0f172a]">{course.rating}</strong>
            <span className="text-[#94a3b8]">({course.students} learners)</span>
          </div>

          <span className="text-sm font-bold text-primary">{course.price}</span>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#e5e7eb] text-xs font-bold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          Explore Course
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};

const HomePage = () => {
  return (
    <main className="w-full overflow-hidden bg-background text-heading]">
      {/* HERO SECTION */}

      <section className="relative border-b border-[#e2e8f0]">
        <div className="mx-auto grid w-full max-w-310 grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 xl:px-12">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#80000020] bg-[#80000008] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[9px] font-bold tracking-[1.5px] text-primary sm:text-[10px]">
                YOUR LEARNING JOURNEY STARTS HERE
              </span>
            </div>

            <h1 className="mt-7 max-w-162.5 text-[43px] font-extrabold leading-[1.08] tracking-[-2.5px] text-heading] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px]">
              Learn more.
              <br />
              <span className="text-primary">Achieve more.</span>
              <br />
              Become more.
            </h1>

            <p className="mt-7 max-w-122.5 text-sm leading-8 text-body sm:text-base">
              Discover courses, explore valuable study materials, and develop
              the skills you need to move forward. Everything you need to learn,
              all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
              >
                Explore Courses
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/notes"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#dce2e9] bg-white px-6 text-sm font-semibold text-heading] transition-all hover:border-primary hover:text-primary"
              >
                <BookOpen size={17} />
                Browse Study Notes
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-[#e2e8f0] pt-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#80000010] text-primary">
                <Users size={19} />
              </div>
              <div>
                <p className="text-xs font-bold text-heading]">
                  Learn without limits.
                </p>
                <p className="mt-1 text-xs text-muted">
                  Resources for every step of your journey.
                </p>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto w-full max-w-310 px-5 py-20 sm:px-8 lg:px-10 xl:px-12">
        <SectionHeading
          eyebrow="EXPLORE AND DISCOVER"
          title="Find your area of interest."
          description="Start exploring subjects that inspire you and discover new opportunities to grow."
          link="All categories"
          href="/courses"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/courses?category=${category.name.toLowerCase()}`}
                key={category.name}
                className="group flex min-h-26.25 items-center gap-4 rounded-lg border border-[#e7eaf0] bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#80000050] hover:shadow-md sm:p-5"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#8000000d] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-heading]">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted">
                    {category.description}
                  </p>
                  <span className="mt-2 block text-[10px] font-semibold text-primary">
                    {category.count}
                  </span>
                </div>

                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-[#94a3b8] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED COURSES */}

      <section className="bg-[#f0f3f7] py-20 sm:py-24">
        <div className="mx-auto w-full max-w-310 px-5 sm:px-8 lg:px-10 xl:px-12">
          <SectionHeading
            eyebrow="LEARN SOMETHING NEW"
            title="Explore popular courses."
            description="Build your knowledge with structured courses and discover skills worth developing."
            link="View all courses"
            href="/courses"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY EDULEARN */}

      <section className="mx-auto grid w-full max-w-310 grid-cols-1 gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-10 xl:px-12">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
            THE EDULEARN EXPERIENCE
          </span>

          <h2 className="mt-4 max-w-115 text-3xl font-bold leading-tight tracking-[-1.5px] text-heading] sm:text-4xl">
            A better way to learn and grow.
          </h2>

          <p className="mt-5 max-w-112.5 text-sm leading-8 text-body">
            Learning should be accessible, organized, and meaningful. EduLearn
            brings educational resources together to help you make the most of
            every learning opportunity.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-primary-hover"
          >
            Discover EduLearn
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="flex flex-col">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.number}
                className="flex gap-5 border-b border-[#e2e8f0] py-7 first:pt-0 last:border-none last:pb-0"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#8000000d] text-primary">
                  <Icon size={23} />
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-bold tracking-widest text-primary">
                    {benefit.number}
                  </span>

                  <h3 className="mt-1 text-base font-bold text-heading]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs leading-7 text-body sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="mx-auto mb-20 w-full max-w-310 px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-xl bg-primary px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-5 -top-16 h-52 w-52 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-155">
            <span className="text-[10px] font-bold tracking-[2px] text-[#f5cccc]">
              YOUR NEXT STEP STARTS HERE
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Make learning a part of your everyday life.
            </h2>

            <p className="mt-4 max-w-132.5 text-sm leading-7 text-[#f1dede]">
              Explore educational resources and take the next step towards your
              goals with EduLearn.
            </p>
          </div>

          <Link
            href="/courses"
            className="relative z-10 mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-white px-6 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:bg-[#f8eeee] sm:w-auto lg:mt-0"
          >
            Start Exploring
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
