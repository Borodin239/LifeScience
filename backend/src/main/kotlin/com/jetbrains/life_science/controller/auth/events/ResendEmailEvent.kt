package com.jetbrains.life_science.controller.auth.events

import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.context.ApplicationEvent

class ResendEmailEvent(
    val credentials: Credentials
) : ApplicationEvent(credentials)
