package com.jetbrains.life_science.controller.auth.events

import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.context.ApplicationEvent
import java.util.Locale

class OnRegistrationCompleteEvent(
    val credentials: Credentials,
    val locale: Locale
) : ApplicationEvent(credentials)
