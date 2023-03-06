FROM buildkite/puppeteer:10.0.0

COPY puppeteer.js /puppeteer.js
COPY puppeteer.sh /puppeteer.sh

RUN chmod u+x /puppeteer.sh

ENTRYPOINT bash puppeteer.sh