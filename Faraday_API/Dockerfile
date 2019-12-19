FROM maven:3.5.2-jdk-8-slim AS MAVEN_TOOL_CHAIN

ARG MAVEN_REPO_USER
ARG MAVEN_REPO_PASS
ARG MAVEN_REPO_URL

ENV MAVEN_REPO_USER=$MAVEN_REPO_USER
ENV MAVEN_REPO_PASS=$MAVEN_REPO_PASS
ENV MAVEN_REPO_URL=$MAVEN_REPO_URL

COPY . /tmp/
WORKDIR /tmp

RUN mvn -s .m2/settings.xml --batch-mode --errors --fail-at-end package

## run tomcat and add built .war
FROM tomcat:8-jre8
RUN apt-get update && apt-get install -y \
    nano \
&& mkdir -p /usr/local/tomcat/conf

EXPOSE 8080

# Copy configurations (Tomcat users, Manager app)
COPY tomcat-users.xml /usr/local/tomcat/conf/
COPY context.xml /usr/local/tomcat/webapps/manager/META-INF/

COPY --from=MAVEN_TOOL_CHAIN /tmp/target/Faraday_API-1.0.war $CATALINA_HOME/webapps/Faraday_API.war

