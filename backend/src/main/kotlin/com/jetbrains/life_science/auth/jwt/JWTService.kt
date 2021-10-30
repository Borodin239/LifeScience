package com.jetbrains.life_science.auth.jwt

interface JWTService {

    fun generateJWT(username: String): JWTCode

    fun validateJWT(authToken: String)

    fun getUserNameFromJWT(token: String): String
}
