---
title: NGINX
description: "Web server, reverse proxy, load balancer, mail proxy and HTTP cache"
created: July 24, 2020
---

<jar-image src="https://res.cloudinary.com/jarautomation/image/upload/c_pad,h_200,w_200/v1595041238/logos/NGINX-logo-rgb-large.png" alt="NGINX Logo"></jar-image>

NginX is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. We install and pre-configure it for you as a reverse proxy to the other application containers we install on your edge hardware. For example, if you have the Ignition Edge container and the Node-Red container and the ip address of your edge gateway is 192.168.1.1. NginX is what allows us to you to access Ignition Edge at http://192.168.1.1/ignition-edge/ and Node Red at http://192.168.1.1/node-red/ from a web browser on a computer that's on the same network as your JAR Edge hardware.

Get more information at the [NginX website](https://www.nginx.com/).