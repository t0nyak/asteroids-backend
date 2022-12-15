const { format, transports, Container } = require('winston');

const { combine, timestamp, printf, label } = format;

const logContainer = new Container();
const customFormat = printf(({ level, message, ...rest }) => {
  return `${rest.timestamp} [${rest.label || '-'}] ${level}: ${message}`;
});

const customCombinedFormat = (module) =>
  combine(format.colorize(), label({ label: module }), timestamp(), customFormat);

const customTransports = () => [new transports.Console()];

logContainer.module = (module) => {
  if (!logContainer.has(module)) {
    logContainer.add(module, {
      format: customCombinedFormat(module),
      transports: customTransports(),
    });
  }
  return logContainer.get(module);
};

module.exports = logContainer;
