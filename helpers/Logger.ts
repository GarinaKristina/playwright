import { createLogger, format, transports, Logger } from 'winston'

export default new (class WinstonLogger {
  private logger: Logger
  private readonly logPath: string = '.artifacts/winston/'

  constructor() {
    this.logger = this.createLogger()
  }

  private createLogger(): Logger {
    return createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`
        })
      ),
      transports: [
        new transports.File({
          filename: `${this.logPath}error.log`,
          level: 'error',
          handleExceptions: true,
        }),
        new transports.File({
          filename: `${this.logPath}info.log`,
          level: 'info',
          format: this.filterLogLevel('info'),
        }),
        new transports.File({
          filename: `${this.logPath}debug.log`,
          level: 'debug',
          format: this.filterLogLevel('debug'),
        }),
        new transports.File({
          filename: `${this.logPath}http.log`,
          level: 'http',
          format: this.filterLogLevel('http'),
        }),
      ],
      exitOnError: false,
    })
  }

  public http(message: string): void {
    this.logger.http(message)
  }

  public debug(message: string): void {
    this.logger.debug(message)
  }

  public info(message: string): void {
    this.logger.info(message)
  }

  public error(message: string): void {
    this.logger.error(message)
  }

  private filterLogLevel(logLevel: string) {
    return format.combine(format(info => (info.level === logLevel ? info : false))())
  }
})()
