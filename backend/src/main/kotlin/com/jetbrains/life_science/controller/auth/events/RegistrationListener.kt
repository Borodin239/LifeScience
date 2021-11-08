package com.jetbrains.life_science.controller.auth.events

import com.jetbrains.life_science.auth.verification.service.VerificationTokenService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.EventListener
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Component
import org.springframework.util.ResourceUtils

@Component
class RegistrationListener {
    @Autowired
    private lateinit var service: VerificationTokenService

    @Value("\${confirmation.path}")
    private lateinit var confirmationPagePath: String

    @Autowired
    private lateinit var mailSender: JavaMailSender

    private val emailHtmlPath: String = "classpath:email/index.html"
    private val textToReplace: String = "{{action_url}}"

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

    private fun getEmailText(token: String): String {
        val text = ResourceUtils.getFile(emailHtmlPath).readText()
        return text.replace(textToReplace, "$confirmationPagePath$token")
    }

    private fun sendRegistrationEmail(emailAddress: String, token: String) {
        val email = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(email, "utf-8")
        val htmlMsg = getEmailText(token)
        email.setContent(htmlMsg, "text/html")
        helper.setTo(emailAddress)
        helper.setSubject("Welcome to JetScience. Let’s verify your email")
        mailSender.send(email)
    }
}
