"use client";
import SiteShell from "../components/SiteShell";

const SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  Frameworks: ["Next.js", "React", "Tailwind CSS", "Node.js"],
  Tools: ["Vercel", "Upstash", "Git & GitHub", "Figma", "Cloudflare"],
  Interests: ["Mechanical engineering", "College admissions data", "Design systems", "Music"],
};

export default function About() {
  return (
    <SiteShell>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="micro mb-3">About</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-8">Hey, I'm Kevin.</h1>

        <div className="space-y-4 text-(--ink) leading-relaxed max-w-prose">
          <p>
            I'm a senior at Brooklyn Technical High School, class of 2027,
            based in Brooklyn, New York. I'm interested in mechanical
            engineering and computer science — and in the overlap between
            them, where well-designed tools solve real problems.
          </p>
          {/* <p>
            Most of what I build starts with something I actually need. This
            past fall that meant college applications: I built a tracker that
            turns messy admissions data — Overgrad pages, College Scorecard,
            Common Data Sets — into deadlines, cohort stats, and shareable
            lists. Then I built a link shortener because the share links got
            too long. Then I redesigned my portfolio three times.
          </p> */}
        </div>

        <div className="mt-16 space-y-10">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group}>
              <h2 className="micro mb-4">{group}</h2>
              <div className="flex flex-wrap gap-2.5">
                {items.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}