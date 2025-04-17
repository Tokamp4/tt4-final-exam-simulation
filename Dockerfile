# Stage 1 (BUILD)
FROM node:lts-alpine AS builder

# inside of image/container
WORKDIR /app

COPY ./my-app/package*.json /app/

RUN npm install

COPY ./my-app /app

RUN npm run build

# Stage 2 (RUN)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]