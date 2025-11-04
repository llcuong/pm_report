FROM node:22-slim AS build
WORKDIR /app

COPY --from=pm-report-frontend-env:2025-11-04 /opt/env/dev/node_modules /app/node_modules

COPY frontend/ /app/

RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=17501
ENV BACKEND_URL=http://pm-report-backend:17500

COPY --from=pm-report-frontend-env:2025-11-04 /opt/env/prod/node_modules /app/node_modules

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/server.js /app/server.js

RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 17501

CMD ["node", "server.js"]