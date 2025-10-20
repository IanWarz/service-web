# Imagen base oficial de Nginx
FROM nginx:alpine

# Copiamos todos los archivos del proyecto al directorio que Nginx sirve por defecto
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 (el que usa Nginx)
EXPOSE 80
