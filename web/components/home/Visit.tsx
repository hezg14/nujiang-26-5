import ContactForm from "@/components/ContactForm";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import type { Dict } from "@/lib/types";

function InfoRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-3">
      <div className="label">{label}</div>
      <div className="text-sm leading-relaxed text-ink-2">{text}</div>
    </div>
  );
}

export default function Visit({ dict }: { dict: Dict }) {
  const visit = dict.visit;

  return (
    <Section id="visit">
      <SectionHead
        eyebrow={visit.eyebrow}
        title={visit.title}
        lead={visit.lead}
      />

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div data-reveal>
          <InfoRow label={visit.labels.season} text={visit.season} />
          <InfoRow label={visit.labels.permits} text={visit.permits} />
          <InfoRow label={visit.labels.access} text={visit.transport} />
        </div>

        <div data-reveal style={{ transitionDelay: "120ms" }}>
          <h3 className="font-serif text-2xl">{visit.formTitle}</h3>
          <ContactForm dict={dict} />
        </div>
      </div>
    </Section>
  );
}
