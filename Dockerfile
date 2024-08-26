FROM mcr.microsoft.com/playwright:v1.46.1-jammy

WORKDIR testapp

COPY . .

RUN npm install

RUN npx playwright install

CMD ["npx", "playwright", "test"]