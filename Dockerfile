FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
