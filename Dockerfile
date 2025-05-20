FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/alinux3:230602.1
COPY ./dist /dist
CMD ["cp","-r","/dist","/data"]
