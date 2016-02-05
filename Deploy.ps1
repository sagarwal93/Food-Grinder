docker build -t foodgrinderclient Client\.
docker build -t foodgrinderserver Server\.

docker run -d --name foodgrinderclient
docker run -d --name foodgrinderserver
