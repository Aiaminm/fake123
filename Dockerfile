FROM python:alpine

COPY ./content /workdir/

RUN apk add --no-cache curl caddy jq bash runit tzdata ttyd p7zip findutils nodejs npm \
    && chmod +x /workdir/service/*/run /workdir/service/*/log/run /workdir/*.sh \
    && /workdir/install.sh \
    && rm -rf /workdir/install.sh /tmp/* ${HOME}/.cache \
    && npm install -g @web3-storage/w3 \
    && cd /workdir
    && npm install @fleekhq/fleek-storage-js \
    && npm install path

ENTRYPOINT ["sh","/workdir/entrypoint.sh"]
