import ReactMarkdown from "react-markdown";

interface Props {
  feedback: string;
}

export default function AICoach({ feedback }: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-6 text-3xl font-bold">🤖 AI Coach</h2>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{feedback}</ReactMarkdown>
      </div>
    </div>
  );
}
