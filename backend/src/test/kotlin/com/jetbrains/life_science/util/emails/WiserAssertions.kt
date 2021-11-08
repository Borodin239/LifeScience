package com.jetbrains.life_science.util.emails

import org.subethamail.wiser.Wiser
import org.subethamail.wiser.WiserMessage
import java.text.MessageFormat
import java.util.function.Predicate
import java.util.function.Supplier
import javax.mail.internet.MimeMessage

class WiserAssertions private constructor(private val messages: List<WiserMessage>) {
    fun from(from: String): WiserAssertions {
        findFirstOrElseThrow(
            { m: WiserMessage -> m.envelopeSender == from },
            assertionError("No message from [{0}] found!", from)
        )
        return this
    }

    fun to(to: String): WiserAssertions {
        findFirstOrElseThrow(
            { m: WiserMessage -> m.envelopeReceiver == to },
            assertionError("No message to [{0}] found!", to)
        )
        return this
    }

    fun withSubject(subject: String): WiserAssertions {
        val predicate =
            Predicate { m: WiserMessage ->
                subject == unchecked(
                    object : ThrowingSupplier<String> {
                        override fun get(): String {
                            return getMimeMessage(m).subject
                        }
                    })
            }
        findFirstOrElseThrow(
            predicate,
            assertionError("No message with subject [{0}] found!", subject)
        )
        return this
    }

    fun withContent(content: String): WiserAssertions {
        findFirstOrElseThrow(
            { m: WiserMessage ->
                val contentAsString: ThrowingSupplier<String> =
                    object : ThrowingSupplier<String> {
                        override fun get(): String {
                            return (getMimeMessage(m).content as String).trim { it <= ' ' }
                        }
                    }
                content == unchecked(
                    contentAsString
                )
            },
            assertionError("No message with content [{0}] found!", content)
        )
        return this
    }

    private fun findFirstOrElseThrow(predicate: Predicate<WiserMessage>, exceptionSupplier: Supplier<AssertionError>) {
        messages.stream().filter(predicate)
            .findFirst().orElseThrow(exceptionSupplier)
    }

    private fun getMimeMessage(wiserMessage: WiserMessage): MimeMessage {
        return unchecked(
            object : ThrowingSupplier<MimeMessage> {
                override fun get(): MimeMessage {
                    return wiserMessage.mimeMessage
                }
            })
    }

    interface ThrowingSupplier<T> {
        @Throws(Throwable::class)
        fun get(): T
    }

    companion object {
        fun assertReceivedMessage(wiser: Wiser): WiserAssertions {
            return WiserAssertions(wiser.messages)
        }

        private fun assertionError(errorMessage: String, vararg args: String): Supplier<AssertionError> {
            return Supplier {
                AssertionError(
                    MessageFormat.format(
                        errorMessage,
                        *args
                    )
                )
            }
        }

        fun <T> unchecked(supplier: ThrowingSupplier<T>): T {
            return try {
                supplier.get()
            } catch (e: Throwable) {
                throw RuntimeException(e)
            }
        }
    }
}
