export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  [key: string]: unknown;
}

class Logger {
  private getRequestId(): string | undefined {
    try {
      // 1. Try AsyncLocalStorage (Server Actions / Node context)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getRequestId } = require('@/lib/request-context');
      return getRequestId();
    } catch {
      // Ignore errors if module not found
    }
    return undefined;
  }

  private format(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
    const requestId = this.getRequestId();
    const timestamp = new Date().toISOString();

    // DEV MODE: Pretty Print
    if (process.env.NODE_ENV === 'development') {
      const color = {
        info: '\x1b[36m', // Cyan
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m', // Red
        debug: '\x1b[90m', // Gray
      }[level];
      const reset = '\x1b[0m';

      const metaStr = meta && Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
      const reqIdStr = requestId ? `[${requestId}]` : '';

      return `${color}[${level.toUpperCase()}]${reset} ${timestamp} ${reqIdStr}: ${message}${metaStr}`;
    }

    // PROD MODE: Structured JSON
    const entry: LogEntry = {
      timestamp,
      level,
      message,
      requestId,
      ...meta,
    };
    return JSON.stringify(entry);
  }

  info(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'test') return;
    console.log(this.format('info', message, meta));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'test') return;
    console.warn(this.format('warn', message, meta));
  }

  error(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'test') return;
    console.error(this.format('error', message, meta));
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'test') return;
    // In Vercel, debug logs are often hidden unless enabled,
    // but in dev we want to see them if we use them.
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.format('debug', message, meta));
    }
  }
}

export const logger = new Logger();
