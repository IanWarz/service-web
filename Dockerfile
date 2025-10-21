# Imagen base oficial de Nginx
FROM nginx:alpine

# Variable de entorno esperada por Cloud Run
ENV PORT=8080

# Reemplaza el puerto por defecto (80) de Nginx con el puerto dinámico de Cloud Run
RUN sed -i "s/listen\s\+80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos (HTML, CSS, JS)
COPY . /usr/share/nginx/html

# Expone el puerto dinámico
EXPOSE 8080

# Inicia Nginx en primer plano
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
