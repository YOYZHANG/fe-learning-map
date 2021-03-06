# network

网络核心设备并不在应用层上起作用，仅在较低层起作用。
这种基本设计，即将应用软件限制在端系统的方法，促进了大量的网络应用程序的迅速研发的部署。


## 网络应用程序体系结构

- 客户-服务器体系结构
- 对等（p2p）体系结构

客户-服务器体系结构：有一个总是打开的主机称为服务器，它服务于来自许多其他称为客户的主机请求。

当 web 服务器接收到来自某客户对某对象的请求时，它向该客户发送所请求的对象作为响应。
特征：
- 两个浏览器并不直接通信
- 该服务器具有固定的，周知的地址，该地址称为 ip 地址


P2P体系结构：
- 对位于数据中心的专用服务器有最小的依赖，相反，应用程序在间断连接的主机对之间使用直接通信，这些主机对被称为对等方。多为流量密集型应用使用。如文件共享，对等方协助下载加速器、因特网电话和视频会议。



## 进程通信
多个端系统上的程序是如何互相通信的？
进行通信实际上是进程而不是程序。一个进程可以被认为是运行在端系统的一个程序，当多个进程运行在相同的端系统上时，他们使用进程间通信机制相互通信。我们主要关注运行在不同端系统上（可能具有不同的操作系统）的进程间的通信。

在两个不同端系统上的进程，通过跨越计算机网络【交换报文】而相互通信。发送进程生成并向网络中发送报文。接收进程接受这些报文并能通过回送报文进行响应。

### 客户端和服务器进程
网络应用程序由成对的进程组成，这些进程通过网络互相发送报文。例如在web应用程序中，一个客户浏览器进程与一台web服务器进程交换报文。在一个 p2p文件共享系统中，文件从一个对等方中的进程传输到另一个对等方中的进程。

进程通过一个称为套接字的软件接口向网络发送报文和从网络接收报文。从一个进程向另一个进程发送报文必须通过下面的网络。进程通过一个称为【套接字】的软件接口像网络发送报文和从网络接收报文。

### 进程寻址
需要定义两种信息：
- 主机的地址： 主机由其 IP 地址 标识。 
- 在目的主机中指定接收进程的标识符： 端口号用于这个目的。例如，web服务器用端口号80来标识。邮件服务器进程用端口号25号来标识。

端口号：http://www.iana.org

### 可供应用程序使用的运输服务
在发送端的应用程序将报文推进该套接字。在该套接字的另一侧，运输层协议负责从接收进程的套接字得到该报文。

包括因特网在内的很多网络提供了不止一种运输层协议。
一个运输层协议能够调用它的应用程序提供什么样的服务呢？
- 可靠数据传输： 分组在计算机网络可能丢失。例如，分组能够使路由器中的缓存溢出。
- 吞吐量
- 定时
- 安全性




