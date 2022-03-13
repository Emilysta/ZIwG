# Server configuration

## Nginx reverse proxy configuration
```
server {
    listen [::]:80;
    listen 80;
    server_name <your.domain>;

    location / {
        root /opt/ziwg-frontend;
    }

    location /api {
        proxy_pass         http://127.0.0.1:5010/;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

## Linux service file:
```
[Unit]
Description=ZIwG

[Service]
WorkingDirectory=/opt/ziwg
ExecStart=/usr/bin/dotnet /opt/ziwg/ziwg.dll --urls=http://localhost:5010
SyslogIdentifier=ZIwG
User=www

RestartSec=10
Restart=always
RestartSec=10
KillSignal=SIGINT

Environment=ASPNETCORE_ENVIRONMENT=Development
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```
