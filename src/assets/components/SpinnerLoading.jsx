export function SpinnerLoading() {
  return (
    <div className="flex justify-center gap-2">
      <span className="size-3 animate-ping rounded-full bg-primary"></span>
      <span className="size-3 animate-ping rounded-full bg-primary [animation-delay:0.2s]"></span>
      <span className="size-3 animate-ping rounded-full bg-primary [animation-delay:0.4s]"></span>
    </div>
  );
}
