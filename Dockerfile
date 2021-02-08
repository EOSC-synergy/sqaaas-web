FROM nginx:alpine
RUN npm install && npm run build
COPY dist /usr/share/nginx/html
RUN ["chmod", "+x", "entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
