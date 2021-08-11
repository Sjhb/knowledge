### 三次握手

- SYN、ACK是什么：TCP报文中
    - 序号(sequence number)：seq序号，占32位，用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记。
    - 确认号（acknowledgement number）：ack序号，占32位，只有ACK标志位为1时，确认序号字段才有效，ack=seq+1。
    - 标志位（Flags）：共6个，即URG、ACK、PSH、RST、SYN、FIN等。具体含义如下：
        - URG：紧急指针（urgent pointer）有效。
        - ACK：确认序号有效。（为了与确认号ack区分开，我们用大写表示）
        - PSH：接收方应该尽快将这个报文交给应用层。
        - RST：重置连接。
        - SYN：发起一个新连接。
        - FIN：释放一个连接。
- 三次握手过程
    1. 客户端发起建立连接的请求falgs=SYN，sequence number = x；
    2. 服务端返回，falgs=SYN ACK，sequence number = y，ACK = x + 1；
    3. 客户端发送TCP报文确立建立起连接，flags=ACK，sequence number=x，ack=y+1
### 四次挥手

1. 当主动方关闭连接时，会发送 FIN 报文，此时发送方的 TCP 连接将从 ESTABLISHED 变成 FIN_WAIT1。
2. 当被动方收到 FIN 报文后，内核会自动回复 ACK 报文，连接状态将从 ESTABLISHED 变成 CLOSE_WAIT，表示被动方在等待进程调用 close 函数关闭连接。
3. 当主动方收到这个 ACK 后，连接状态由 FIN_WAIT1 变为 FIN_WAIT2，也就是表示主动方的发送通道就关闭了。
4. 当被动方进入 CLOSE_WAIT 时，被动方还会继续处理数据，等到进程的 read 函数返回 0 后，应用程序就会调用 close 函数，进而触发内核发送 FIN 报文，此时被动方的连接状态变为 LAST_ACK。
5. 当主动方收到这个 FIN 报文后，内核会回复 ACK 报文给被动方，同时主动方的连接状态由 FIN_WAIT2 变为 TIME_WAIT，在 Linux 系统下大约等待 1 分钟后，TIME_WAIT 状态的连接才会彻底关闭。
6. 当被动方收到最后的 ACK 报文后，被动方的连接就会关闭。

### TCP为什么需要握手过程

- 信道是不可靠的，但是我们要建立可靠的连接发送可靠的数据，也就是数据传输是需要可靠的

### TCP VS UDP

- TCP面向连接，UDP面向无连接
- TCP基于字节流，UDP基于报文的
- UDP可一对多，不能保证稳定性，TCP可以保证稳定性，且为1对1
- UDP资源开销更小：更小的报文