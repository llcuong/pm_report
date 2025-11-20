#!/usr/bin/env bash
set -e
cd /app

echo "[run]"
gunicorn pm_report.wsgi:application --bind 0.0.0.0:30000 --workers 3 --timeout 60
