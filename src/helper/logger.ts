const winston = require('winston');
import 'winston-daily-rotate-file';
export class ApiLogger {
    public static newInstance() {
        winston.addColors({
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green'
        });
        const logFormat = winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.json(),
            winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
        );
        return winston.createLogger({
            level: 'info',
            format: logFormat,
            defaultMeta: { service: 'projects-service' },
            transports: [
                new winston.transports.DailyRotateFile({
                    level: process.env.LOG_LEVEL,
                    datePattern: 'dd-MM-yyyy.',
                    dirname: './logs',
                    filename: './log',
                    prepend: true,
                }),
                new winston.transports.Console({
                    colorize: true,
                    prettyPrint: true,
                }),
            ],
        });
    }
}
export default ApiLogger.newInstance();
