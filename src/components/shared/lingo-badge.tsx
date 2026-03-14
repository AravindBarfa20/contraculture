export function LingoBadge() {
  return (
    <div className="mt-12 text-center py-6 border-t">
      <a
        href="https://lingo.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="font-medium">🌐 Powered by Lingo.dev</span>
        <span className="text-xs">— AI-powered i18n automation</span>
      </a>
    </div>
  );
}
