FROM pm-report-runtime:2025-11-13
ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /app


COPY --chown=appuser:appuser backend/ /app/
COPY --chown=appuser:appuser --chmod=0755 docker/backend/docker-entrypoint.sh /entry.sh

EXPOSE 30000

ENTRYPOINT ["/entry.sh"]
