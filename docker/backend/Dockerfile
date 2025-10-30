FROM pm-report-runtime:2025.10.25
ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /app


COPY --chown=appuser:appuser backend/ /app/
COPY --chown=appuser:appuser --chmod=0755 docker/backend/docker-entrypoint.sh /entry.sh

EXPOSE 17500

ENTRYPOINT ["/entry.sh"]
