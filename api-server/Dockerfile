# ベースイメージを指定
FROM python:3.11.4-slim

# 作業ディレクトリを設定
WORKDIR /src

# 環境変数を設定
ENV PYTHONUNBUFFERED=1
ENV TZ JST-9

# pipのアップグレード
RUN pip install --upgrade pip

# 依存関係をインストール
COPY requirements.txt /src/
RUN pip install -r requirements.txt

# アプリケーションのコードをコピー
COPY . /src/

EXPOSE 8000
