package com.jetbrains.life_science.method.service

import com.jetbrains.life_science.article.entity.Article
import com.jetbrains.life_science.article.repository.ArticleRepository
import com.jetbrains.life_science.container.repository.ContainerRepository
import com.jetbrains.life_science.exceptions.MethodNotFoundException
import com.jetbrains.life_science.exceptions.SectionNotFoundException
import com.jetbrains.life_science.method.repository.MethodRepository
import com.nhaarman.mockitokotlin2.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentCaptor
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.support.MessageSourceAccessor
import org.springframework.test.context.jdbc.Sql
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
internal class MethodServiceImplTest {

    @MockBean
    lateinit var articleRepository: ArticleRepository

    @Autowired
    lateinit var methodService: MethodService

    @Autowired
    lateinit var methodRepository: MethodRepository

    @Autowired
    lateinit var containerRepository: ContainerRepository

    @MockBean
    lateinit var messageSourceAccessor: MessageSourceAccessor

    @BeforeEach
    @Sql("/scripts/test_trunc_data.sql")
    internal fun setUp() {
        reset(articleRepository, messageSourceAccessor)
    }

    @Test
    @Transactional
    @Sql("/scripts/test_common_data.sql")
    internal fun `create method test`() {
        Mockito.`when`(messageSourceAccessor.getMessage("general_information")).thenReturn("General information")

        val info = mock<MethodInfo> {
            on { name } doReturn "method test"
            on { sectionId } doReturn 1
            on { id } doReturn 0
        }

        val saved = methodService.create(info)

        val method = methodRepository.findById(saved.id).orElseThrow()

        assertEquals("method test", method.name)
        assertEquals(1, method.section.id)

        val generalInfo = method.generalInfo

        assertEquals(generalInfo.method.id, method.id)
        assertEquals("method test", generalInfo.name)
        assertEquals("General information", generalInfo.description)

        val argument = ArgumentCaptor.forClass(Article::class.java)
        verify(articleRepository, times(1)).save(argument.capture())

        assertEquals(generalInfo.id, argument.value.containerId)
    }

    @Test
    @Transactional
    @Sql("/scripts/test_common_data.sql")
    internal fun `create method incorrect section id test`() {
        val info = mock<MethodInfo> {
            on { name } doReturn "method test"
            on { sectionId } doReturn -1
            on { id } doReturn 0
        }

        assertThrows<SectionNotFoundException> { methodService.create(info) }
    }

    @Test
    @Transactional
    @Sql("/scripts/test_common_data.sql")
    internal fun `delete method test`() {
        assertTrue(methodRepository.existsById(2))
        assertTrue(containerRepository.existsById(3))

        methodService.deleteByID(2)

        assertFalse(methodRepository.existsById(2))
        assertFalse(containerRepository.existsById(3))
        verify(articleRepository, times(1)).deleteAllByContainerId(3)
    }

    @Test
    @Transactional
    @Sql("/scripts/test_common_data.sql")
    internal fun `delete method incorrect id test`() {
        assertThrows<MethodNotFoundException> { methodService.deleteByID(-1) }
    }
}