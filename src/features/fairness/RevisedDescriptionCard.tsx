import { useState } from "react";
import { Check, Copy, FileText } from "lucide-react";
import { SectionHeader } from "../../components/ui";

interface RevisedDescriptionCardProps {
  revised: string;
}

export function RevisedDescriptionCard({ revised }: RevisedDescriptionCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(revised);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = revised;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="card animate-fade-in p-5">
      <SectionHeader
        title="Revised job description"
        subtitle="Suggested inclusive rewrite — review and edit before posting."
        action={
          <button onClick={copy} className="btn-primary text-xs">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy text
              </>
            )}
          </button>
        }
      />
      <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {revised}
        </p>
      </div>
    </div>
  );
}
