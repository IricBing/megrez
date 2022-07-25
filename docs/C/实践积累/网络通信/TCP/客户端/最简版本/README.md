# 最简版本

与[服务端](../../服务端/最简版本/README.md)相同，TCP客户端的最简版本也只需要一个sys/socket库即可，如下所示：

```c
#include <arpa/inet.h>
#include <errno.h>
#include <fcntl.h>
#include <netdb.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#define SERVER_PORT 6666

/*
连接到服务器后，会不停循环，等待输入，
输入quit后，断开与服务器的连接
*/
int main() {

  //客户端只需要一个套接字文件描述符，用于和服务器通信
  int clientSocket;

  //描述服务器的socket
  struct sockaddr_in serverAddr;

  char sendbuf[200];
  char recvbuf[200];
  int iDataNum;

  if ((clientSocket = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
    perror("socket");
    return 1;
  }

  serverAddr.sin_family = AF_INET;
  serverAddr.sin_port = htons(SERVER_PORT);

  //指定服务器端的ip，本地测试：127.0.0.1
  // inet_addr()函数，将点分十进制IP转换成网络字节序IP
  serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");

  if (connect(clientSocket, (struct sockaddr *)&serverAddr,
              sizeof(serverAddr)) < 0) {
    perror("connect");
    return 1;
  }

  printf("连接到主机...\n");

  while (1) {
    printf("发送消息:");
    scanf("%s", sendbuf);
    printf("\n");
    send(clientSocket, sendbuf, strlen(sendbuf), 0);
    if (strcmp(sendbuf, "quit") == 0)
      break;

    printf("读取消息:");
    recvbuf[0] = '\0';
    iDataNum = recv(clientSocket, recvbuf, 200, 0);
    recvbuf[iDataNum] = '\0';
    printf("%s\n", recvbuf);
  }

  close(clientSocket);

  return 0;
}

```

## 文件下载

<a href="C/实践积累/网络通信/TCP/客户端/最简版本/assets/files/client.c" download="client.c">client.c</a>

