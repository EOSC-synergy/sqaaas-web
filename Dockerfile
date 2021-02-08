FROM nginx:alpine
RUN apk add --update nodejs npm && apk add --update npm
COPY . /mnt
RUN cd /mnt && npm install && npm run build
RUN cp -a /mnt/dist/. /usr/share/nginx/html
RUN ["chmod", "+x", "/mnt/entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
