# CSRFtest
this is a test on CSRF on node.js server
## 运行asite
进入Asite目录下,直接运行命令
```
npm start   //这是3000端口运行的一个web服务器
会有一个登录界面.这个登录界面是我很久之前做的,拿过来直接用了.
```
进入hackSite目录下
```
npm start   //这是80端口运行的一个web服务器
```

the "/" route on hackSite is the csrf of GET request
the "/testPost"  one is POST request

POST cross domain by iframe 
https://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript