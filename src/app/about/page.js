import { HOME_ROUTE } from "@/constants/routes";
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Compass,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Insights to Elearning.",
};

const values = [
  {
    number: "01",
    icon: BookOpen,
    title: "Accessible Learning",
    description:
      "We believe educational resources should be easier to discover and access. Learning opportunities should be available to everyone willing to grow.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Continuous Growth",
    description:
      "Learning does not end with a classroom or a certificate. We encourage curiosity, exploration, and the development of lifelong skills.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Quality Matters",
    description:
      "We value useful, organized, and meaningful educational content that supports understanding rather than simply providing information.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Learner First",
    description:
      "Every learning experience should be designed around the needs, interests, and goals of the people using the platform.",
  },
];

const learningFeatures = [
  {
    icon: BookMarked,
    title: "Study Materials",
    description:
      "Discover organized notes and educational resources to support your academic journey.",
  },
  {
    icon: Laptop,
    title: "Online Courses",
    description:
      "Explore learning opportunities and develop knowledge across different subject areas.",
  },
  {
    icon: Globe2,
    title: "A Wider Perspective",
    description:
      "Explore different subjects, ideas, and skills beyond the boundaries of traditional learning.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Discover courses, subjects, and educational resources that match your interests.",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "Build your understanding through structured content and learning materials.",
  },
  {
    number: "03",
    title: "Grow",
    description:
      "Apply what you learn, develop new skills, and continue moving forward.",
  },
];

const SectionLabel = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-primary sm:text-[11px]">
      <span className="h-0.5 w-5 bg-primary" />
      {children}
    </span>
  );
};

const SectionHeading = ({ eyebrow, title, description, centered = false }) => {
  return (
    <div
      className={`mb-10 ${
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }`}
    >
      <SectionLabel>{eyebrow}</SectionLabel>

      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-1.3px] text-heading sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-8 text-body sm:text-base">
        {description}
      </p>
    </div>
  );
};

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-[#f4f1ef]">
      <div className="relative mx-auto grid w-full max-w-310 grid-cols-1 items-center gap-12 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-24 xl:px-12">
        <div>
          <SectionLabel>GET TO KNOW EDULEARN</SectionLabel>

          <h1 className="mt-6 text-[43px] font-extrabold leading-[1.1] tracking-[-2.5px] text-heading sm:text-5xl md:text-6xl lg:text-[65px]">
            Education opens
            <br />
            <span className="text-primary">possibilities.</span>
          </h1>

          <p className="mt-7 max-w-135 text-sm leading-8 text-body sm:text-base">
            EduLearn is a learning platform built around a simple idea: making
            educational resources easier to discover, access, and explore. We
            want to make every step of your learning journey more meaningful.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Explore Learning
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/notes"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#dce2e9] bg-white px-6 text-sm font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
            >
              Browse Resources
              <BookOpen size={17} />
            </Link>
          </div>
        </div>

        {/* Editorial visual */}
        <div className="relative mx-auto w-full max-w-117.5 lg:ml-auto">
          <div className="relative overflow-hidden rounded-xl border border-[#e8dcd8] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                  OUR BELIEF
                </span>
                <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-heading sm:text-3xl">
                  Every learner
                  <br />
                  deserves an
                  <br />
                  opportunity.
                </h3>
              </div>

              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#8000000d] text-primary">
                <GraduationCap size={25} />
              </div>
            </div>

            <div className="my-7 h-px bg-[#e9edf1]" />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-[#f7f3f1] p-4">
                <BookOpen size={23} className="text-primary" />
                <h4 className="mt-4 text-sm font-bold text-heading">
                  Knowledge
                </h4>
                <p className="mt-1 text-[11px] leading-5 text-body">
                  Discover and understand.
                </p>
              </div>

              <div className="rounded-lg bg-[#f7f3f1] p-4">
                <Lightbulb size={23} className="text-primary" />
                <h4 className="mt-4 text-sm font-bold text-heading">Growth</h4>
                <p className="mt-1 text-[11px] leading-5 text-body">
                  Learn and move forward.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-primary px-4 py-4 text-white">
              <div>
                <p className="text-xs font-semibold">The EduLearn philosophy</p>
                <p className="mt-1 text-[10px] text-white/75">
                  Learn today. Build tomorrow.
                </p>
              </div>
              <ArrowUpRight size={21} />
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-28 w-28 rounded-xl border border-[#80000025]" />
        </div>
      </div>
    </section>
  );
};

const OurStory = () => {
  return (
    <section className="mx-auto grid w-full max-w-310 grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-10 xl:px-12">
      <div className="relative">
        <div className="overflow-hidden rounded-xl bg-[#eee7e3] p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                OUR STORY
              </span>
              <h3 className="mt-3 max-w-75 text-3xl font-bold leading-tight tracking-tight text-heading sm:text-4xl">
                Learning should be a journey, not a barrier.
              </h3>
            </div>

            <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-primary sm:grid">
              <Compass size={24} />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3">
            <div className="h-24 rounded-lg bg-primary p-3 text-white sm:h-32">
              <BookOpen size={23} />
              <span className="mt-5 block text-[10px] font-semibold sm:text-xs">
                Discover
              </span>
            </div>

            <div className="mt-5 h-24 rounded-lg border border-[#80000020] bg-white p-3 text-primary sm:h-32">
              <Lightbulb size={23} />
              <span className="mt-5 block text-[10px] font-semibold sm:text-xs">
                Understand
              </span>
            </div>

            <div className="h-24 rounded-lg bg-[#fbbf24] p-3 text-[#3f2b05] sm:h-32">
              <Target size={23} />
              <span className="mt-5 block text-[10px] font-semibold sm:text-xs">
                Achieve
              </span>
            </div>
          </div>

          <p className="mt-8 max-w-sm text-xs leading-7 text-body">
            A space to explore ideas, access knowledge, and develop the
            confidence to keep learning.
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>HOW IT STARTED</SectionLabel>

        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-1.5px] text-heading sm:text-4xl">
          Built around the
          <span className="text-primary"> power of learning.</span>
        </h2>

        <div className="mt-7 space-y-5 text-sm leading-8 text-body">
          <p>
            Education plays an important role in shaping individuals, creating
            opportunities, and building a better future. However, finding useful
            learning resources and bringing them together in one accessible
            place can sometimes be challenging.
          </p>

          <p>
            EduLearn aims to address this experience by bringing educational
            resources, study materials, and learning opportunities together
            through a single platform.
          </p>

          <p>
            Our goal is to create a space where learners can explore different
            subjects, discover useful content, and continue developing their
            knowledge at their own pace.
          </p>
        </div>

        <Link
          href="/courses"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4"
        >
          Start exploring
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
};

const MissionVision = () => {
  return (
    <section className="bg-[#f1f3f6] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-310 px-5 sm:px-8 lg:px-10 xl:px-12">
        <SectionHeading
          eyebrow="OUR PURPOSE AND DIRECTION"
          title="What drives EduLearn."
          description="Our purpose shapes what we build, while our vision guides where we want to go."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-primary p-7 text-white sm:p-10">
            <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border border-white/10" />

            <div className="relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/10">
                <Target size={25} />
              </div>

              <span className="mt-8 block text-[10px] font-bold uppercase tracking-[2px] text-[#f3d6d6]">
                OUR MISSION
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Making learning more accessible and meaningful.
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-8 text-white/80">
                Our mission is to bring educational resources, study materials,
                and learning opportunities together in an organized and
                accessible platform that supports learners in their educational
                journey.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-[#e3e8ee] bg-white p-7 sm:p-10">
            <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border border-[#80000015]" />

            <div className="relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#8000000d] text-primary">
                <Compass size={25} />
              </div>

              <span className="mt-8 block text-[10px] font-bold uppercase tracking-[2px] text-primary">
                OUR VISION
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                A world where knowledge creates opportunity.
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-8 text-body">
                We envision an educational environment where learners can easily
                discover knowledge, explore new interests, build practical
                skills, and pursue their ambitions through continuous learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OurValues = () => {
  return (
    <section className="mx-auto w-full max-w-310 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 xl:px-12">
      <SectionHeading
        eyebrow="WHAT WE BELIEVE IN"
        title="The values behind everything we do."
        description="The principles that guide how we think about education, create resources, and serve learners."
        centered
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <article
              key={value.number}
              className="group rounded-xl border border-[#e7eaf0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#80000040] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#8000000d] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={23} />
                </div>

                <span className="text-xs font-bold tracking-widest text-[#cbd5e1]">
                  {value.number}
                </span>
              </div>

              <h3 className="mt-7 text-base font-bold text-heading">
                {value.title}
              </h3>

              <p className="mt-3 text-xs leading-7 text-body">
                {value.description}
              </p>

              <div className="mt-6 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-16" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

const LearningApproach = () => {
  return (
    <section className="bg-[#f8fafc] py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-310 grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-10 xl:px-12">
        <div>
          <SectionLabel>THE LEARNING EXPERIENCE</SectionLabel>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-1.5px] text-heading sm:text-4xl">
            Everything starts with
            <span className="text-primary"> curiosity.</span>
          </h2>

          <p className="mt-5 text-sm leading-8 text-body">
            We want to make it easier for learners to find what they need,
            understand new concepts, and take ownership of their learning
            journey.
          </p>

          <div className="mt-9 space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#8000000d] text-xs font-bold text-primary">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-sm font-bold text-heading">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-7 text-body">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {learningFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`rounded-xl border border-[#e7eaf0] bg-white p-6 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#8000000d] text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-base font-bold text-heading">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-7 text-body">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center justify-end">
                  <ArrowUpRight size={18} className="text-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutCTA = () => {
  return (
    <section className="mx-auto mb-20 w-full max-w-310 px-5 sm:px-8 lg:px-10 xl:px-12">
      <div className="relative overflow-hidden rounded-xl bg-primary px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-5 -top-16 h-52 w-52 rounded-full border border-white/10" />

        <div className="relative z-10 max-w-162.5">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#f3d6d6]">
            YOUR JOURNEY STARTS HERE
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Your potential deserves a place to grow.
          </h2>

          <p className="mt-4 text-sm leading-8 text-white/80">
            Explore new subjects, discover educational resources, and take
            another step towards your learning goals.
          </p>
        </div>

        <Link
          href="/courses"
          className="relative z-10 mt-8 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-md bg-white px-6 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:bg-[#f8eeee] sm:w-auto lg:mt-0"
        >
          Start Learning
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <main className="w-full overflow-hidden bg-background text-heading">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <OurValues />
      <LearningApproach />
      <AboutCTA />
    </main>
  );
};

export default AboutPage;
