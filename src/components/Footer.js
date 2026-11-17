"use client";

import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  REGISTER_STUDENT_ROUTE,
  REGISTER_TEACHER_ROUTE,
} from "@/constants/routes";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const platformLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Study Notes", href: "/notes" },
  { name: "Marketplace", href: "/marketplace" },
];

const resourceLinks = [
  { name: "Browse All Courses", href: "/courses" },
  { name: "Explore Study Notes", href: "/notes" },
  { name: "Learning Resources", href: "/resources" },
  { name: "Frequently Asked Questions", href: "/faq" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Our Mission", href: "/about" },
  { name: "Help & Support", href: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    Icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    Icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    Icon: FaGithub,
  },
];

const FooterLink = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-white"
      >
        <ChevronRight
          size={13}
          className="text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
        {children}
      </Link>
    </li>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="mb-6 text-sm font-bold text-white">{title}</h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <FooterLink key={link.name} href={link.href}>
            {link.name}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const hideFooterRoutes = [
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    REGISTER_STUDENT_ROUTE,
    REGISTER_TEACHER_ROUTE,
  ];
  const pathname = usePathname();

  if (hideFooterRoutes.includes(pathname)) return null;

  return (
    <footer className="bg-dark-bg text-white">
      {/* =====================================
          MAIN FOOTER
      ===================================== */}

      <div className="mx-auto w-full max-w-310 px-5 pb-12 pt-16 sm:px-8 sm:pt-20 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* BRAND SECTION */}

          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="EduLearn home"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                <GraduationCap size={28} strokeWidth={2} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Edu<span className="text-primary">Learn</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-8 text-muted">
              Empowering learners through accessible educational resources,
              meaningful learning experiences, and opportunities to grow.
              Discover knowledge and take your next step with EduLearn.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.Icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit EduLearn on ${social.name}`}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-dark-secondary text-muted transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* PLATFORM LINKS */}

          <div className="lg:col-span-2">
            <FooterColumn title="Platform" links={platformLinks} />
          </div>

          {/* RESOURCES */}

          <div className="lg:col-span-3">
            <FooterColumn title="Learning Resources" links={resourceLinks} />
          </div>

          {/* COMPANY */}

          <div className="lg:col-span-3">
            <FooterColumn title="Company" links={companyLinks} />

            {/* CONTACT INFORMATION */}

            <div className="mt-9">
              <h3 className="mb-5 text-sm font-bold text-white">
                Get in touch
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@edulearn.com"
                  className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-white"
                >
                  <Mail size={16} className="shrink-0 text-primary" />
                  <span>hello@edulearn.com</span>
                </a>

                <div className="flex items-start gap-3 text-sm text-muted">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>Connect with learners everywhere.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            BOTTOM CTA STRIP
        ===================================== */}

        <div className="flex flex-col gap-5 border-b border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Ready to explore something new?
            </h3>

            <p className="mt-2 text-sm text-muted">
              Your next learning opportunity is just a click away.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-md bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-primary-hover sm:self-auto"
          >
            Explore Courses
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* =====================================
            COPYRIGHT AND LEGAL
        ===================================== */}

        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-muted">
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/contact"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Support
            </Link>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-muted">
            Made for learners
            <Heart size={13} className="fill-primary text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
