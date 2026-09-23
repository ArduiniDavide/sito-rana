import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalHeader } from "@/components/legal-header"
import { LegalLayout, LegalBulletList, LegalCallout, type LegalSection } from "@/components/legal-layout"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di Giovanni Rana: cookie, dati di navigazione, finalità del trattamento e diritti dell'utente secondo il GDPR.",
}

const sections: LegalSection[] = [
  {
    id: "titolare",
    number: "01",
    title: "Titolare del trattamento",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    children: (
      <>
        <p>
          Il titolare del trattamento dei dati personali è <strong className="font-semibold text-anthracite">Giovanni Rana S.p.A.</strong>, con sede in San Giovanni Lupatoto (VR), Italia.
          Per qualsiasi richiesta relativa alla tutela della tua privacy puoi scrivere all'indirizzo email dedicato:
        </p>
        <p className="mt-3">
          <a href="mailto:privacy@giovannirana.example.com" className="font-medium text-tomato-red underline underline-offset-2 transition-colors hover:text-anthracite">
            privacy@giovannirana.example.com
          </a>
        </p>
      </>
    ),
  },
  {
    id: "dati",
    number: "02",
    title: "Tipologie di dati raccolti",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    children: (
      <>
        <p>Questo sito raccoglie esclusivamente dati di navigazione anonimi e aggregati. Nello specifico:</p>
        <LegalBulletList
          items={[
            <><strong className="font-semibold text-anthracite">Dati di navigazione:</strong> pagine visitate, durata della sessione, tipo di browser e dispositivo utilizzato. Questi dati sono raccolti in forma anonima e non permettono di identificare l'utente.</>,
            <><strong className="font-semibold text-anthracite">Dati forniti volontariamente:</strong> qualora tu compilassi un form di contatto, i dati che inserisci (nome, email, messaggio) verranno trattati esclusivamente per rispondere alla tua richiesta.</>,
          ]}
        />
        <p className="mt-3">
          Non raccogliamo dati sensibili né dati di minorari senza il consenso dei genitori o tutori.
        </p>
      </>
    ),
  },
  {
    id: "cookie",
    number: "03",
    title: "Cookie e tecnologie simili",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
    children: (
      <>
        <p>Utilizziamo due categorie di cookie:</p>
        <LegalBulletList
          items={[
            <><strong className="font-semibold text-anthracite">Cookie essenziali</strong> — necessari per il corretto funzionamento del sito (memoria del consenso, sicurezza della sessione). Non richiedono consenso preventivo e non possono essere disattivati.</>,
            <><strong className="font-semibold text-anthracite">Cookie analitici</strong> — ci aiutano a comprendere come i visitatori usano il sito, in forma anonima e aggregata, per migliorarne i contenuti e l'esperienza. Vengono attivati solo dopo il tuo consenso esplicito tramite il popup visualizzato in basso a destra.</>,
          ]}
        />
        <LegalCallout>
          Puoi modificare o revocare il tuo consenso in qualsiasi momento eliminando i cookie del browser dalle
          impostazioni e ricaricando la pagina. Il consenso viene memorizzato localmente nel tuo dispositivo.
        </LegalCallout>
      </>
    ),
  },
  {
    id: "finalita",
    number: "04",
    title: "Finalità del trattamento",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    children: (
      <p>
        I dati vengono trattati per le seguenti finalità: garantire il funzionamento tecnico del sito e la sicurezza
        della navigazione; analizzare in forma aggregata il traffico per comprendere l'utilizzo delle pagine;
        migliorare i contenuti, la navigazione e l'esperione utente; rispondere alle richieste inviate tramite i form
        di contatto. Non cediamo i tuoi dati a terzi per finalità di marketing o profilazione.
      </p>
    ),
  },
  {
    id: "conservazione",
    number: "05",
    title: "Conservazione dei dati",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M9 16l2 2 4-4" /></svg>,
    children: (
      <p>
        I dati di navigazione anonimi vengono conservati per un periodo massimo di <strong className="font-semibold text-anthracite">24 mesi</strong>,
        dopodiché vengono automaticamente cancellati. I dati forniti volontariamente tramite form di contatto
        vengono conservati per il tempo strettamente necessario a rispondere alla richiesta e comunque non oltre
        <strong className="font-semibold text-anthracite"> 12 mesi</strong>. Il consenso ai cookie analitici
        viene memorizzato nel tuo browser fino alla cancellazione manuale dei cookie.
      </p>
    ),
  },
  {
    id: "diritti",
    number: "06",
    title: "I tuoi diritti",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    children: (
      <>
        <p>
          In conformità al <strong className="font-semibold text-anthracite">Regolamento UE 2016/679 (GDPR)</strong>,
          hai diritto di:
        </p>
        <LegalBulletList
          items={[
            <><strong className="font-semibold text-anthracite">Accesso</strong> — ottenere conferma che i tuoi dati siano trattati e conoscerne il contenuto.</>,
            <><strong className="font-semibold text-anthracite">Rettifica</strong> — correggere dati inesatti o incompleti.</>,
            <><strong className="font-semibold text-anthracite">Cancellazione</strong> — chiedere l'eliminazione dei tuoi dati ("diritto all'oblio").</>,
            <><strong className="font-semibold text-anthracite">Limitazione</strong> — richiedere la limitazione del trattamento in determinate condizioni.</>,
            <><strong className="font-semibold text-anthracite">Opposizione</strong> — opporti al trattamento per motivi legittimi.</>,
            <><strong className="font-semibold text-anthracite">Portabilità</strong> — ricevere i tuoi dati in formato strutturato e trasferibili.</>,
            <><strong className="font-semibold text-anthracite">Revoca del consenso</strong> — revocare in qualsiasi momento il consenso precedentemente prestato.</>,
          ]}
        />
        <p className="mt-3">
          Per esercitare questi diritti scrivi a{" "}
          <a href="mailto:privacy@giovannirana.example.com" className="font-medium text-tomato-red underline underline-offset-2 transition-colors hover:text-anthracite">
            privacy@giovannirana.example.com
          </a>. Hai inoltre diritto di rivolgerti all'Autorità Garante per la protezione dei dati personali
          (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="font-medium text-tomato-red underline underline-offset-2 transition-colors hover:text-anthracite">www.garanteprivacy.it</a>).
        </p>
      </>
    ),
  },
  {
    id: "modifiche",
    number: "07",
    title: "Modifiche all'informativa",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    children: (
      <p>
        Ci riserviamo il diritto di aggiornare la presente Privacy Policy per adeguarla a eventuali modifiche
        normative o organizzative. Eventuali modifiche saranno pubblicate su questa pagina con la data di
        aggiornamento indicata in alto. Ti invitiamo a consultare regolarmente questa pagina per rimanere
        informato sugli eventuali cambiamenti.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <LegalHeader
        kicker="Documento legale"
        title="Privacy Policy"
        updatedAt="21 settembre 2026"
        intro="La tua privacy è importante per noi. Questa informativa descrive come Giovanni Rana raccoglie, utilizza e protegge i tuoi dati personali quando navighi sul nostro sito, in conformità al Regolamento UE 2016/679 (GDPR)."
      />
      <div className="bg-cream py-12 sm:py-16">
        <LegalLayout sections={sections} />
        <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-10">
          <div className="rounded-2xl bg-anthracite p-6 text-cream sm:p-8">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-semibold">Hai domande sulla tua privacy?</h3>
                <p className="mt-1 text-sm text-cream/60">
                  Scrivici e ti risponderemo entro 48 ore.
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
