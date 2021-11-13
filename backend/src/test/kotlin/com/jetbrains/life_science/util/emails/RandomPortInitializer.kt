package com.jetbrains.life_science.util.emails

import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.test.context.support.TestPropertySourceUtils
import org.springframework.util.SocketUtils

class RandomPortInitializer : ApplicationContextInitializer<ConfigurableApplicationContext> {
    override fun initialize(applicationContext: ConfigurableApplicationContext) {
        val randomPort: Int = SocketUtils.findAvailableTcpPort()
        TestPropertySourceUtils.addInlinedPropertiesToEnvironment(
            applicationContext,
            "spring.mail.port=$randomPort"
        )
    }
}
