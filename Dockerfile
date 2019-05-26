FROM python:3.7-alpine AS converter
WORKDIR /app
COPY requirements.txt ./
RUN pip install -U pip && pip install -r requirements.txt
COPY convert.py ./
RUN mkdir ./data
COPY data ./data/
RUN python convert.py ./all.json

FROM node:10-alpine AS build
WORKDIR /app
RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install
RUN mkdir -p public/data/ src/
COPY public ./public/
COPY LICENSE Changelog.txt ./public/
COPY src ./src/
COPY --from=converter /app/all.json ./public/data/
COPY --from=converter /app/data/by-list.json ./public/data/
RUN yarn build

FROM node:10-alpine AS run
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build/
CMD serve build -l 5151