import React from "react";
import dynamic from "next/dynamic";
import SectionLabel from "../ui/section-label";
import SectionBackground from "@/components/ui/section-background";
import { ContactUs } from "../contact-form/ContactUs";
import { Reveal } from "@/animation/reveal";

const PulseBeams = dynamic(
  () => import("../PulseBeams").then((mod) => mod.PulseBeams),
  { ssr: false },
);
import { PhoneCallIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MailIcon } from "../icons";
import { company, whatsappUrl, WHATSAPP_GREETING } from "@/data/company";

const ContactConnection = () => {
  return (
    <div
      id="contact"
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-14 md:py-24 lg:px-20"
    >
      <SectionBackground variant={3} />
      <div className="relative mx-auto lg:max-w-7xl">
        <Reveal>
          <div className="mb-3 flex justify-center sm:mb-4">
            <SectionLabel center>Contact</SectionLabel>
          </div>
          <h1 className="text-foreground text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Start a <span className="text-accent">conversation</span>
          </h1>
          <p className="text-muted-foreground mt-3 mb-4 text-center text-sm sm:mt-4 sm:text-base">
            Tell us what you are trying to build. WhatsApp gets the fastest
            answer — usually the same day.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-6 mb-10 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:mb-16 sm:gap-8 md:flex-row"
        >
          <a
            href={whatsappUrl(WHATSAPP_GREETING)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3"
          >
            <FaWhatsapp className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
            <p className="text-foreground group-hover:text-accent text-sm font-bold transition-colors sm:text-lg">
              {company.contact.whatsappDisplay}
            </p>
          </a>

          <a
            href={`tel:${company.contact.phone}`}
            className="group flex items-center space-x-3"
          >
            <PhoneCallIcon className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
            <p className="text-foreground group-hover:text-accent text-sm font-bold transition-colors sm:text-lg">
              {company.contact.phone}
            </p>
          </a>

          {/* Skipped if the mailbox is ever blanked — see company.ts. */}
          {company.contact.email && (
            <a
              href={`mailto:${company.contact.email}`}
              className="group flex items-center space-x-3"
            >
              <MailIcon className="text-accent h-5 w-5 sm:h-6 sm:w-6" />
              <p className="text-foreground group-hover:text-accent text-sm font-bold transition-colors sm:text-lg">
                {company.contact.email}
              </p>
            </a>
          )}
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.15} className="lg:col-span-8">
            <PulseBeams />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-4">
            <ContactUs />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactConnection;
