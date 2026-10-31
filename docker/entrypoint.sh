#!/bin/sh
# Container entrypoint: render the nginx config, start both backends, wait until
# they answer, then hand the foreground to nginx as PID 1.
#
# PID 1 matters: the platform stops a container by sending SIGTERM to PID 1, and
# if nginx were backgrounded the signal would land nowhere and every deploy would
# end in a SIGKILL timeout.
set -eu

PORT="${PORT:-10000}"
API_PORT="${API_PORT:-8000}"
WEB_PORT="${WEB_PORT:-3000}"

echo "→ public port ${PORT}; api on :${API_PORT}, web on :${WEB_PORT}"

# PORT is runtime-only on the platform, but nginx needs it inside the config.
sed "s/__PORT__/${PORT}/g" /app/docker/nginx.conf.template > /etc/nginx/conf.d/default.conf

cd /app/api
# Create the schema once, here, rather than in every worker's import.
echo "→ python -m bootstrap"
python -m bootstrap

BOOTSTRAP_SCHEMA=0 uvicorn main:app \
  --host 127.0.0.1 \
  --port "${API_PORT}" \
  --workers 2 \
  --proxy-headers \
  --forwarded-allow-ips='*' &
API_PID=$!

cd /app/web
HOSTNAME=127.0.0.1 PORT="${WEB_PORT}" node server.js &
WEB_PID=$!

# The platform decides a deploy is healthy by probing /api/health. Answering 502
# from nginx during boot would look like a failed deploy, so wait for the
# backends — but never block forever: after the budget, let nginx come up and
# report the real error instead of hiding it.
wait_for() {
  name="$1"
  url="$2"
  tries=0
  while [ "${tries}" -lt 40 ]; do
    if curl -fsS -o /dev/null "${url}" 2>/dev/null; then
      echo "→ ${name} ready at ${url}"
      return 0
    fi
    tries=$((tries + 1))
    sleep 1
  done
  echo "! ${name} did not answer ${url} within 40s — starting nginx anyway" >&2
  return 0
}

wait_for "api" "http://127.0.0.1:${API_PORT}/api/health"
wait_for "web" "http://127.0.0.1:${WEB_PORT}/"

# If either backend died during boot, say so loudly before taking traffic.
for pid in "${API_PID}" "${WEB_PID}"; do
  if ! kill -0 "${pid}" 2>/dev/null; then
    echo "! process ${pid} is not running — check the logs above" >&2
  fi
done

exec nginx -g 'daemon off;'
