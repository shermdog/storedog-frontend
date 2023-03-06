FROM node:16 as builder

# Update, upgrade, and cleanup debian packages
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install --yes gettext-base && \
    apt-get clean

WORKDIR /storedog-app
COPY . .
RUN chmod +x ./entrypoint.sh
EXPOSE 3000
RUN ["yarn","install"]
ENTRYPOINT ["/storedog-app/entrypoint.sh"]
