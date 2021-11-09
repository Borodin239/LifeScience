package com.jetbrains.life_science.controller.auth

import com.jetbrains.life_science.user.credentials.entity.Credentials
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/ping")
class PingController {

    @Operation(summary = "Checks the relevance of the user's session")
    @GetMapping
    fun getResult(@AuthenticationPrincipal credentials: Credentials) {
    }
}
