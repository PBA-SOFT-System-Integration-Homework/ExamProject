FROM tomcat:8-jre8

RUN apt-get update && apt-get install -y \
    nano \
&& mkdir -p /usr/local/tomcat/conf

EXPOSE 8080

# Copy configurations (Tomcat users, Manager app)
COPY tomcat-users.xml /usr/local/tomcat/conf/
COPY context.xml /usr/local/tomcat/webapps/manager/META-INF/

COPY /target/Faraday_API-1.0.war /usr/local/tomcat/webapps/Faraday_API.war
