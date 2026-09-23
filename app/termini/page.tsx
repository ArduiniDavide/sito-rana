import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalHeader } from "@/components/legal-header"
import { LegalLayout, LegalBulletList, LegalCallout, type LegalSection } from "@/components/legal-layout"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description:
    "Termini e condizioni d'uso del sito Giovanni Rana: regole di utilizzo, proprietà intellettuale, ricette, responsabilità e legge applicabile.",
}

const sections: LegalSection[] = [
  {
    id: "accettazione",
    number: "01",
    title: "Accettazione dei termini",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    children: (
      <p>
        Accedendo e utilizzando questo sito web accetti integralmente i presenti Termini e Condizioni. Se non sei
        d'accordo con una o più parti, ti chiediamo di non utilizzare il sito. L'uso continuato del sito dopo
        eventuali modifiche ai Termini implica l'accettazione della versione aggiornata.
      </p>
    ),
  },
  {
    id: "uso",
    number: "02",
    title: "Uso del sito",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>,
    children: (
      <>
        <p>I contenuti del sito sono destinati a uso personale e informativo. Ti impegni a non:</p>
        <LegalBulletList
          items={[
            <>Riprodurre, distribuire o commercializzare i contenuti senza preventiva autorizzazione scritta.</>,
            <>Tentare di compromettere la sicurezza del sito o accedere ad aree riservate non autorizzate.</>,
            <>Utilizzare strumenti automatici (bot, scraper, crawler) per estrarre dati su larga scala.</>,
            <>Inserire contenuti falsi, ingannevoli o che violino i diritti di terzi in eventuali form di contatto.</>,
            <>Utilizzare il sito per finalità illecite o comunque non conformi alla sua natura informativa.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "proprieta",
    number: "03",
    title: "Proprietà intellettuale",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><path d="M21 12c0 5-3.5 7.5-9 10-5.5-2.5-9-5-9-10V5l9-3 9 3v7z" /></svg>,
    children: (
      <>
        <p>
          Tutti i contenuti del sito — testi, immagini, loghi, ricette, grafica, layout e design — sono di proprietà
          di Giovanni Rana o dei rispettivi titolari e sono protetti dalle leggi italiane e internazionali sul
          diritto d'autore.
        </p>
        <p className="mt-3">
          È consentito l'uso personale dei contenuti per consultazione. È vietato qualsiasi uso non autorizzato per
          finalità commerciali, inclusa la ripubblicazione, la modifica o l'inclusione in altri siti o progetti
          senza il preventivo consenso scritto di Giovanni Rana.
        </p>
      </>
    ),
  },
  {
    id: "ricette",
    number: "04",
    title: "Ricette e contenuti culinari",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" /><path d="M6 17h12" /></svg>,
    children: (
      <>
        <p>
          Le ricette pubblicate hanno finalità divulgativa e informativa. I tempi di cottura, le dosi e i risultati
          sono indicativi e possono variare in base alla qualità degli ingredienti, alle attrezzature disponibili
          e all'esperienza del cuoco.
        </p>
        <LegalCallout>
          Giovanni Rana non si assume alcuna responsabilità per eventuali risultati diversi dalle aspettative,
          per allergie o intolleranze non considerate, né per danni derivanti dall'applicazione delle ricette.
          Verifica sempre la compatibilità degli ingredienti con le tue esigenze alimentari.
        </LegalCallout>
      </>
    ),
  },
  {
    id: "link",
    number: "05",
    title: "Link esterni",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    children: (
      <p>
        Il sito può contenere link a risorse esterne gestite da terzi. Giovanni Rana non è responsabile dei
        contenuti, delle politiche sulla privacy o delle pratiche di tali siti. La presenza di un link non implica
        approvazione o raccomandazione. Ti invitiamo a consultare le informative dei siti di terzi.
      </p>
    ),
  },
  {
    id: "responsabilita",
    number: "06",
    title: "Limitazione di responsabilità",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg>,
    children: (
      <p>
        Nella misura massima consentita dalla legge applicabile, Giovanni Rana non risponde di danni diretti o
        indiretti derivanti dall'uso o dall'impossibilità di usare il sito, inclusa — a titolo esemplificativo ma
        non esaustivo — l'eventuale inesattezza dei contenuti, interruzioni del servizio, perdita di dati o
        danni consequenziali. Il sito è fornito "così com'è" senza garanzie esplicite o implicite.
      </p>
    ),
  },
  {
    id: "modifiche",
    number: "07",
    title: "Modifiche ai termini",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    children: (
      <p>
        Ci riserviamo il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche entrano in
        vigore dalla data di pubblicazione su questa pagina. L'uso continuato del sito dopo le modifiche implica
        l'accettazione dei nuovi termini. Ti consigliamo di consultare periodicamente questa pagina.
      </p>
    ),
  },
  {
    id: "legge",
    number: "08",
    title: "Legge applicabile e foro competente",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l9-3 9 3v2H3z" /><path d="M5 8v10M9 8v10M15 8v10M19 8v10" /><path d="M3 21h18" /></svg>,
    children: (
      <p>
        I presenti Termini sono regolati dalla <strong className="font-semibold text-anthracite">legge italiana</strong>.
        Per qualsiasi controversia relativa all'interpretazione o all'esecuzione dei presenti Termini è competente
        in via esclusiva il <strong className="font-semibold text-anthracite">Foro di Verona</strong>.
      </p>
    ),
  },
  {
    id: "contatti",
    number: "09",
    title: "Contatti",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>,
    children: (
      <p>
        Per qualsiasi domanda o chiarimento sui presenti Termini e Condizioni puoi scrivere a{" "}
        <a href="mailto:privacy@giovannirana.example.com" className="font-medium text-tomato-red underline underline-offset-2 transition-colors hover:text-anthracite">
          privacy@giovannirana.example.com
        </a>.
      </p>
    ),
  },
]

export default function TerminiPage() {
  return (
    <>
      <Navbar />
      <LegalHeader
        kicker="Documento legale"
        title="Termini e Condizioni"
        updatedAt="21 settembre 2026"
        intro="Benvenuto sul sito di Giovanni Rana. Prima di navigare ti invitiamo a leggere con attenzione i presenti Termini e Condizioni, che regolano l'utilizzo del sito e descrivono i tuoi diritti e doveri come utente."
      />
      <div className="bg-cream py-12 sm:py-16">
        <LegalLayout sections={sections} />
        <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-10">
          <div className="rounded-2xl bg-anthracite p-6 text-cream sm:p-8">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-semibold">Hai domande sui Termini?</h3>
                <p className="mt-1 text-sm text-cream/60">
                  Siamo a tua disposizione per qualsiasi chiarimento.
                </p>
              </div>
              <a
                href="mailto:privacy@giovannirana.example.com"
                className="inline-flex items-center gap-2 rounded-full bg-pasta-yellow px-6 py-3 text-sm font-semibold text-anthracite transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                Contattaci
              </a>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <BackButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
