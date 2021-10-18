package com.jetbrains.life_science.controller.auth.events

import com.jetbrains.life_science.auth.verification.service.VerificationTokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationListener
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Component
import java.util.*

@Component
class RegistrationListener : ApplicationListener<OnRegistrationCompleteEvent> {
    @Autowired
    private lateinit var service: VerificationTokenService

    /*@Autowired
    private lateinit var messages: MessageSource*/

    @Autowired
    private lateinit var mailSender: JavaMailSender

    override fun onApplicationEvent(event: OnRegistrationCompleteEvent) {
        confirmRegistration(event)
    }

    private fun confirmRegistration(event: OnRegistrationCompleteEvent) {
        val credentials = event.credentials
        val token = UUID.randomUUID().toString()
        service.createVerificationToken(credentials, token)
        val recipientAddress: String = credentials.email
        val subject = "JetScience registration"
        val confirmationUrl = "/regitrationConfirm.html?token=$token"
        // val message = messages.getMessage("message.regSuccess", null, Loca)
        val email = SimpleMailMessage()
        email.setTo(recipientAddress)
        email.subject = subject
        email.text = "http://localhost:8080$confirmationUrl"
        mailSender.send(email)
    }
}
