const {createLogger,format,transports} = require('winston');
const {combine,colorize,prettyPrint,printf,simple} = format;
const config = require('config');
const moment = require('moment-timezone');

const appendTimestamp = format((info, opts) => {
  if(opts.tz)
    info.timestamp = moment().tz(opts.tz).format();
  return info;
});

const logger = new createLogger({
    level: config.get('LOGGER.level'),
    format: combine(
        appendTimestamp({ tz: config.get('LOGGER.tz') }),
        simple()
    ),
    exitOnError: false
});

if (process.env.NODE_ENV != 'production') {
   logger.add(new transports.Console({
        handleExceptions: true,
        format: combine(
            colorize(),
            appendTimestamp({ tz: config.get('LOGGER.tz')}),
            simple()
        )
   }));
}

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
