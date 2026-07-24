#!/usr/bin/env bash
#
# Re/START — arranque homologado (contrato Boiler §5.1).
# Sitio Vue 3 + Vite con SSR Express (server.js) + /api de contacto. Sin base de datos.
#
# Puertos (bloque 8430+):
#   8430 → Express SSR + /api  ← ENTRADA: http://restart.localhost:8430
#
# Uso:
#   ./run.sh up       dev server SSR con hot-reload (foreground, Ctrl+C detiene)
#   ./run.sh down     mata el dev server si quedó corriendo
#   ./run.sh restart  down + up
#   ./run.sh status   ¿está corriendo?
#   ./run.sh          = up
#
# Nota: usa `yarn dev:server` (SSR + /api). Con `yarn dev` (SPA) el formulario
# de contacto NO funciona.
set -euo pipefail

cd "$(dirname "$0")"

APP_PORT=8430

case "${1:-up}" in
  up)
    if [ ! -d node_modules ]; then
      echo "→ Instalando dependencias (yarn install)…"
      yarn install
    fi
    echo
    echo "   App → http://restart.localhost:$APP_PORT"
    echo
    PORT="$APP_PORT" exec yarn dev:server
    ;;
  down)
    pids="$(lsof -ti ":$APP_PORT" -sTCP:LISTEN 2>/dev/null || true)"
    if [ -n "$pids" ]; then kill $pids && echo "✓ Dev server detenido."; else echo "No había nada corriendo en :$APP_PORT."; fi
    ;;
  restart)
    "$0" down
    exec "$0" up
    ;;
  status)
    if lsof -i ":$APP_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "Corriendo → http://restart.localhost:$APP_PORT"
    else
      echo "Detenido"
    fi
    ;;
  logs)
    echo "El dev server corre en foreground (./run.sh up); no hay logs separados."
    ;;
  backup)
    echo "Este proyecto no tiene base de datos ni datos locales que respaldar."
    ;;
  *)
    echo "Uso: ./run.sh {up|down|restart|status}"
    exit 1
    ;;
esac
