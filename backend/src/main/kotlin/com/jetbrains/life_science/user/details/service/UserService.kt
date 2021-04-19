package com.jetbrains.life_science.user.details.service

import com.jetbrains.life_science.user.details.entity.User

interface UserService {

    fun getByEmail(email: String): User

    fun getById(id: Long): User
}