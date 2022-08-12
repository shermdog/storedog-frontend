FROM node:lts as builder
WORKDIR /storedog-app
COPY . .
EXPOSE 3000
RUN ["yarn","install"]

# This will be needed for build time
#FROM nginx:1.22.0
#COPY --from=builder /storedog-app/dist /usr/share/nginx/html
#COPY ./packages/nginx/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]