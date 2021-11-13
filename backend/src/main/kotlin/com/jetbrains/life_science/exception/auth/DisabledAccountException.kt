package com.jetbrains.life_science.exception.auth

class DisabledAccountException(val email: String) : RuntimeException()
