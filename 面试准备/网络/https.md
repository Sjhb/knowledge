#### https证书内容

LTS证书就相当于网站的身份证，只有当前访问的的网站和证书持有者是匹配的，才能建立连接。

世界上的 CA 机构会遵守 X.509 规范来签发公钥证书，证书内容的语法格式遵守 ASN.1；

> 证书查看方式：导出证书为pem格式，然后通过命令`openssl x509 -in \*.qima-inc.com.pem -text`查看

```
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 1 (0x1)
    Signature Algorithm: sha1WithRSAEncryption
        Issuer: C=GB, ST=Greater Manchester, L=Salford, O=Comodo CA Limited, CN=AAA Certificate Services
        Validity
            Not Before: Jan  1 00:00:00 2004 GMT
            Not After : Dec 31 23:59:59 2028 GMT
        Subject: C=GB, ST=Greater Manchester, L=Salford, O=Comodo CA Limited, CN=AAA Certificate Services
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:be:40:9d:f4:6e:e1:ea:76:87:1c:4d:45:44:8e:
                    be:46:c8:83:06:9d:c1:2a:fe:18:1f:8e:e4:02:fa:
                    f3:ab:5d:50:8a:16:31:0b:9a:06:d0:c5:70:22:cd:
                    49:2d:54:63:cc:b6:6e:68:46:0b:53:ea:cb:4c:24:
                    c0:bc:72:4e:ea:f1:15:ae:f4:54:9a:12:0a:c3:7a:
                    b2:33:60:e2:da:89:55:f3:22:58:f3:de:dc:cf:ef:
                    83:86:a2:8c:94:4f:9f:68:f2:98:90:46:84:27:c7:
                    76:bf:e3:cc:35:2c:8b:5e:07:64:65:82:c0:48:b0:
                    a8:91:f9:61:9f:76:20:50:a8:91:c7:66:b5:eb:78:
                    62:03:56:f0:8a:1a:13:ea:31:a3:1e:a0:99:fd:38:
                    f6:f6:27:32:58:6f:07:f5:6b:b8:fb:14:2b:af:b7:
                    aa:cc:d6:63:5f:73:8c:da:05:99:a8:38:a8:cb:17:
                    78:36:51:ac:e9:9e:f4:78:3a:8d:cf:0f:d9:42:e2:
                    98:0c:ab:2f:9f:0e:01:de:ef:9f:99:49:f1:2d:df:
                    ac:74:4d:1b:98:b5:47:c5:e5:29:d1:f9:90:18:c7:
                    62:9c:be:83:c7:26:7b:3e:8a:25:c7:c0:dd:9d:e6:
                    35:68:10:20:9d:8f:d8:de:d2:c3:84:9c:0d:5e:e8:
                    2f:c9
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                A0:11:0A:23:3E:96:F1:07:EC:E2:AF:29:EF:82:A5:7F:D0:30:A4:B4
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            X509v3 Basic Constraints: critical
                CA:TRUE
            X509v3 CRL Distribution Points:

                Full Name:
                  URI:http://crl.comodoca.com/AAACertificateServices.crl

                Full Name:
                  URI:http://crl.comodo.net/AAACertificateServices.crl

    Signature Algorithm: sha1WithRSAEncryption
         08:56:fc:02:f0:9b:e8:ff:a4:fa:d6:7b:c6:44:80:ce:4f:c4:
         c5:f6:00:58:cc:a6:b6:bc:14:49:68:04:76:e8:e6:ee:5d:ec:
         02:0f:60:d6:8d:50:18:4f:26:4e:01:e3:e6:b0:a5:ee:bf:bc:
         74:54:41:bf:fd:fc:12:b8:c7:4f:5a:f4:89:60:05:7f:60:b7:
         05:4a:f3:f6:f1:c2:bf:c4:b9:74:86:b6:2d:7d:6b:cc:d2:f3:
         46:dd:2f:c6:e0:6a:c3:c3:34:03:2c:7d:96:dd:5a:c2:0e:a7:
         0a:99:c1:05:8b:ab:0c:2f:f3:5c:3a:cf:6c:37:55:09:87:de:
         53:40:6c:58:ef:fc:b6:ab:65:6e:04:f6:1b:dc:3c:e0:5a:15:
         c6:9e:d9:f1:59:48:30:21:65:03:6c:ec:e9:21:73:ec:9b:03:
         a1:e0:37:ad:a0:15:18:8f:fa:ba:02:ce:a7:2c:a9:10:13:2c:
         d4:e5:08:26:ab:22:97:60:f8:90:5e:74:d4:a2:9a:53:bd:f2:
         a9:68:e0:a2:6e:c2:d7:6c:b1:a3:0f:9e:bf:eb:68:e7:56:f2:
         ae:f2:e3:2b:38:3a:09:81:b5:6b:85:d7:be:2d:ed:3f:1a:b7:
         b2:63:e2:f5:62:2c:82:d4:6a:00:41:50:f1:39:83:9f:95:e9:
         36:96:98:6e
```
一个证书由DATA和SIGNATUR组成，其中 Data 包含的内容有：

- 证书版本号（Version），如：X.509v3
- 序列号（Serial Number）：一个 CA 机构内是唯一的，但不是全局唯一
- 签名算法（Signature Algorithm）：签名的计算公式为RSA(sha1(Data), IssuerPrivateKey), sha1和sha256都是摘要算法；
- 签发者（Issuer）：DN（Distinguished Name）
- 有效期（Validity）：证书的有效期间 [Not Before, Not After]
- 证书拥有者（Subject）：也是一个 DN公钥长度一般是 2048bit，1024bit已经被证明不安全
- 证书公钥信息（Subject Public Key Inf0）
- 扩展字段：证书所携带的域名信息会配置在 SAN 中（X509v3 Subject Alternative Name）

Signature 位于证书最末尾，签名算法 sha1WithRSAEncryption 在 Data 域内已经指明 ，而 RSA 进行非对称加密所需的私钥（Private Key）则是由 Issuer 提供，Issuer 是一个可以签发证书的证书，由证书权威 CA 提供，CA 需要保证证书的有效性，而且 CA 的私钥需要绝密保存；

生成签名的公式:`Signature = RSA(sha1(Data), IssuerPrivateKey)`.

#### https证书验证过程：证书链
证书链是什么？

浏览器和网站在建立连接的过程中，会得到网站的LTS证书和证书链；

完整的证书内容一般分为3级，服务端证书-中间证书-根证书，即 end-user certificates， intermediates Certificates 和 root Certificates。

- end-user ：用来加密传输数据的公钥的证书，是https中使用的证书。开发者牛小七把证书部署在qiniu.com 的服务器上。
- intermediates：CA用来认证公钥持有者身份的证书，即确认https使用的end-user证书是属于qiniu.com的证书。
- root：用来认证intermediates证书是合法证书的证书。

简单来说，end-user证书上面几级证书都是为了保证end-user证书未被篡改，保证是CA签发的合法证书，进而保证end-user证书中的公钥未被篡改。我们使用end-user certificates来确保加密传输数据的公钥(public key)不被篡改，而又如何确保end-user certificates的合法性呢？这个认证过程跟公钥的认证过程类似，首先获取颁布end-user certificates的CA的证书，然后验证end-user certificates的signature。一般来说，root CAs不会直接颁布end-user certificates的，而是授权给多个二级CA，而二级CA又可以授权给多个三级CA，这些中间的CA就是intermediates CAs，它们才会颁布end-user certificates。

UA（浏览器或操作系统，user-agent）中会预先内置一些权威 CA 签发的根证书（Root Certificate）或中间证书（Intermediate Certificate）

#### https连接建立过程（LTS）

非对称加密 + 对称加密：

1、某网站拥有用于非对称加密的公钥A、私钥A’。
2、浏览器向网站服务器请求，服务器把公钥A明文给传输浏览器。
3、浏览器随机生成一个用于对称加密的密钥X，用公钥A加密后传给服务器。
4、服务器拿到后用私钥A’解密得到密钥X。
5、这样双方就都拥有密钥X了，且别人无法知道它。之后双方所有数据都通过密钥X加密解密即可。

为保证公钥A未被篡改，需要验证https证书合法性，从https证书中获取公钥A

#### 中间人攻击原理

1、第一次使用http访问网站，服务器端升级为HTTPS（HSTS：HTTP Strict Transport Security,通过添加http response header实现），但是被中间人劫持、降级。

预加载 HSTS
谷歌维护着一个 HSTS 预加载服务。按照如下指示成功提交你的域名后，浏览器将会永不使用非安全的方式连接到你的域名。虽然该服务是由谷歌提供的，但所有浏览器都有使用这份列表的意向（或者已经在用了）。但是，这不是 HSTS 标准的一部分，也不该被当作正式的内容。\
Chrome & Chromium 的 HSTS 预加载列表： https://www.chromium.org/hsts\
Firefox 的 HSTS 预加载列表：https://hg.mozilla.org/mozilla-central/raw-file/tip/security/manager/ssl/nsSTSPreloadList.inc\

2、Wi-Fi欺骗：攻击者可以创建与本地免费Wi-Fi选项同名的假Wi-Fi接入点。例如，在咖啡馆中，攻击者可能会模仿Wi-Fi名称或创建一个名为“Guest Wi-Fi”或类似名称的假选项。一旦您连接到恶意访问点，攻击者就可以监视您的在线活动。
3、DNS欺骗：域名系统帮助你在互联网上导航，把地址栏中的URL从人类可读的文本变成计算机可读的IP地址。然后，DNS欺骗会迫使您的浏览器在攻击者的控制下访问特定地址。
4、电子邮件劫持：如果攻击者能够访问受信任机构（如银行）的邮箱，甚至电子邮件服务器，他们就可以截获包含敏感信息的客户电子邮件，甚至开始以机构本身的身份发送电子邮件。
5、HTTPS欺骗：攻击者欺骗您的浏览器，使其相信您正在使用一个受信任的网站，从而将您的流量重定向到一个不安全的网站。当您输入凭据时，攻击者会将其窃取。
6、SSL劫持：当您尝试连接到不安全的HTTP站点时，浏览器可以将您重定向到安全HTTPS选项。但是，攻击者可以劫持重定向过程，将指向其服务器的链接放在中间，窃取您的数据和您输入的任何凭据。

#### 加密算法

- 对称加密：DES、AES、3DES，双方持有相同密钥加密，加密速度快

- 非对称加密：RSA、背包算法、Elgamal、Rabin，RSA使用最广泛，如SSH、HTTPS、TLS、电子证书、电子签名、电子身份证等。公钥+私钥，相对对称加密来说非对称加密速度很慢


> 参考资料：https://zhuanlan.zhihu.com/p/30655259