# www-harjoitustyo
Kurssin www-sovellukset harjoitustyöpalautus

Download documentation here:

https://github.com/matikka96/www-harjoitustyo/raw/master/documentation.pdf

## Running in docker (temporary, API keys are not safe…)

[NOTE] Docker CLI must be already installed and running on local device

Download project from Github and build it in Docker with command:

```
docker build -t hodlerlistserver https://github.com/matikka96/www-harjoitustyo.git
```

This will create docker image named "hodlerlistserver".
Final step is to run above image with command:

```
docker run -p 3000:3000 -d hodlerlistserver
```

Now your app is seen here: http://localhost:3000
