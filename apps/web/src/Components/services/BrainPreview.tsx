/* A company brain answering from the business's own documents, with the source. */
export default function BrainPreview() {
  return (
    <div className="space-y-2.5 text-[13px]">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-zinc-900 px-3.5 py-2 text-white">
        What did we quote Northwind last year?
      </p>
      <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-zinc-700 ring-1 ring-zinc-200">
        $6,400 for the Q3 retainer, accepted in September.
        <span className="mt-2 flex w-fit items-center gap-1.5 rounded-md bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          proposal-northwind.pdf
        </span>
      </div>
    </div>
  );
}
