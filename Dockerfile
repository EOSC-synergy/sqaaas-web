FROM node

#Install ghp-import
RUN apt-get -y update && apt-get -y install ghp-import python-pip bash
RUN pip install setuptools
