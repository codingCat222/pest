interface FormatOptions {
    weekday?: boolean;
    utc?: boolean;
}

export function formatDate(value?: string | null, opts: FormatOptions = {}): string | undefined {
    if (!value) return undefined;
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-GB', {
        weekday: opts.weekday ? 'short' : undefined,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: opts.utc ? 'UTC' : undefined,
    });
}

export function apiErrorMessage(err: any, fallback: string): string {
    return err?.response?.data?.error || err?.message || fallback;
}