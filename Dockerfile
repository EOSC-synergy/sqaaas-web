FROM node

#Install ghp-import
RUN apt-get -y update && apt-get -y install ghp-import python-pip
RUN pip install setuptools

#Install dependencies
RUN npm --prefix ./ install

#Create static website
RUN npm --prefix ./ run build
