package com.jetbrains.life_science.judge.events

import org.springframework.context.ApplicationEvent

class JudgePublishProtocolApproveEvent(
    source: Any,
    val requestId: Long
) : ApplicationEvent(source)
