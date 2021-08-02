FROM python:3.8.8

WORKDIR /recommender_api

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "./api.py"]