# ベースイメージを指定
FROM node:lts-alpine

# 作業ディレクトリを設定
WORKDIR /src

RUN apk update && \
    apk upgrade && \
    apk add git && \
    npm install -g npm@latest nuxi nuxt3

# アプリケーションのコードをコピー
COPY . /src/
