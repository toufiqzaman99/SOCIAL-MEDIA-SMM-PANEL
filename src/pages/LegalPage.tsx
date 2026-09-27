import PageHeader from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { legalDocs } from '@/data/legal'
import type { LegalKind } from '@/data/legal'

export interface LegalPageProps {
  kind: LegalKind
}

export default function LegalPage({ kind }: LegalPageProps) {
  const doc = legalDocs[kind]

  return (
    <>
      <PageHeader eyebrow="法律条款" title={doc.title} subtitle={`最近更新：${doc.updated}`} />
      <section className="pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl space-y-8">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-white">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-400">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
