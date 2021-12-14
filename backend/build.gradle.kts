import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jlleitschuh.gradle.ktlint.reporter.ReporterType

val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions.useIR = true

plugins {
    id("org.springframework.boot") version "2.5.7"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("org.jlleitschuh.gradle.ktlint") version "10.0.0"
    kotlin("jvm") version "1.4.31"
    kotlin("plugin.spring") version "1.4.31"
    kotlin("plugin.allopen") version "1.4.31"
    kotlin("plugin.noarg") version "1.4.31"
    kotlin("plugin.serialization") version "1.4.31"
}

group = "com.jetbrains"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11
// Log4J2 Vulnerability fix
extra["log4j2.version"] = "2.15.0"

repositories {
    mavenCentral()
}

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.0")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("io.jsonwebtoken:jjwt:0.9.1")
    implementation("io.jsonwebtoken:jjwt-api:0.11.2")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.13.0")

    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.1")

    implementation("org.junit.jupiter:junit-jupiter:5.8.2")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("com.nhaarman.mockitokotlin2:mockito-kotlin:2.2.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test:5.5.1")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2-native-mt")
    testImplementation("org.subethamail:subethasmtp:3.1.7")
    testImplementation("com.h2database:h2:2.0.202")

    implementation("org.springdoc:springdoc-openapi-webmvc-core:1.5.12")
    implementation("org.springdoc:springdoc-openapi-ui:1.5.12")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation(group = "org.springframework.data", name = "spring-data-elasticsearch", version = "4.2.7")

    implementation(group = "org.springframework.boot", name = "spring-boot-starter-validation")
    implementation(group = "org.postgresql", name = "postgresql")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

allOpen {
    annotation("javax.persistence.Entity")
    annotation("javax.persistence.Embeddable")
    annotation("javax.persistence.MappedSuperclass")
}

noArg {
    annotation("javax.persistence.Entity")
    annotation("javax.persistence.Embeddable")
    annotation("javax.persistence.MappedSuperclass")
}

ktlint {
    disabledRules.add("import-ordering")
    disabledRules.add("no-wildcard-imports")
    verbose.set(true)
    outputToConsole.set(true)
    coloredOutput.set(true)
    reporters {
        reporter(ReporterType.CHECKSTYLE)
    }
    filter {
        exclude("**/test/**")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

compileKotlin.kotlinOptions {
    freeCompilerArgs = listOf("-Xinline-classes")
}
