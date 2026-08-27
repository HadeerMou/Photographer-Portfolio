import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArchiveFilter from "@/components/ArchiveFilter";
import { SectionHeading } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Full Archive — Hadeer Mouwad",
  description: "Every photo, filterable by camera or phone and by type.",
};

export default function ArchivePage() {
  return (
    <main className="relative">
      <Nav />
      <section className="relative border-b border-graphite-light px-6 pb-24 pt-32 md:px-14 md:pb-32 md:pt-40">
        <SectionHeading
          eyebrow="Full Roll — Unedited"
          title="THE FULL ARCHIVE"
          note="Every frame that's been shot, filed by camera or phone and then by type. Nothing curated yet."
        />
        <div className="mt-14">
          <ArchiveFilter />
        </div>
      </section>
      <Footer />
    </main>
  );
}
