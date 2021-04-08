const { log } = console;

export default function logger(...args) {
  log.apply(console, args);
}
