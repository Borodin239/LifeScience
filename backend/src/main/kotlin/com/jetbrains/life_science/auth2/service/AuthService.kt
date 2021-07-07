package com.jetbrains.life_science.auth2.service

import com.jetbrains.life_science.auth2.refresh.entity.RefreshTokenCode
import com.jetbrains.life_science.user.credentials.entity.Credentials

interface AuthService {

    fun login(authCredentials: AuthCredentials): AuthTokens

    fun register(credentials: Credentials): AuthTokens

    fun refreshTokens(userCredentials: Credentials, refreshTokenCode: RefreshTokenCode): AuthTokens
}