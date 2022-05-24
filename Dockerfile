FROM node:14

COPY . /sqaaas-web

WORKDIR /sqaaas-web

#Install ghp-import
RUN apt-get -y update && apt-get -y install ghp-import python-pip bash nano
RUN pip install setuptools

EXPOSE 8080
CMD ["npm", "run", "stage"]
