package com.jetbrains.life_science.controller.auth.events

import com.jetbrains.life_science.auth.verification.service.VerificationTokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.EventListener
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Component

@Component
class RegistrationListener {
    @Autowired
    private lateinit var service: VerificationTokenService

    @Value("\${confirmation.path}")
    private lateinit var confirmationPagePath: String

    @Autowired
    private lateinit var mailSender: JavaMailSender

    @EventListener
    fun handleRegistrationCompleteEvent(event: OnRegistrationCompleteEvent) {
        val credentials = event.credentials
        val token = service.createVerificationToken(credentials).token
        sendRegistrationEmail(credentials.email, token)
    }

    @EventListener
    fun handleResendEmailEvent(event: ResendEmailEvent) {
        val credentials = event.credentials
        val token = service.updateVerificationToken(event.credentials).token
        sendRegistrationEmail(credentials.email, token)
    }

    private fun sendRegistrationEmail(emailAddress: String, token: String) {
        val subject = "JetScience registration"
        val email = SimpleMailMessage()
        email.setTo(emailAddress)
        email.subject = subject
        email.text = "$confirmationPagePath$token"
        mailSender.send(email)
    }
}
