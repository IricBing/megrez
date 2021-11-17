# SSH Pipeline

## 示例：

```yml
---
kind: pipeline
type: ssh
name: pull

clone:
  disable: true

server:
  host: xxx.xxx.xxx.xxx
  user: ubuntu
  password:
    from_secret: server_ubuntu_password

steps:
  - name: git pull
    commands:
      - cd /home/ubuntu/code/oss && git pull

---
kind: pipeline
type: ssh
name: reload

clone:
  disable: true

server:
  host: xxx.xxx.xxx.xxx
  user: drone
  password:
    from_secret: server_drone_password

steps:
  - name: nginx reload
    commands:
      - sudo nginx -s reload

depends_on:
  - pull
```