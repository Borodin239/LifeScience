package com.jetbrains.life_science

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActionsDsl
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put

@SpringBootTest
@AutoConfigureMockMvc
abstract class ControllerTest<DTO, View>(
    private val name: String,
    private val viewToken: Class<View>
) {

    final lateinit var apiUrl: String

    @Autowired
    lateinit var mockMvc: MockMvc

    private val jsonMapper = jacksonObjectMapper()

    protected fun get(id: Long, url: String = apiUrl): View {
        val entity = getRequest(id, url)
            .andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
            .andReturn().response.contentAsString
        return getViewFromJson(entity)
    }

    protected fun post(dto: DTO, url: String = apiUrl): View {
        val viewJson = postRequest(dto, url)
            .andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
            .andReturn().response.contentAsString
        return getViewFromJson(viewJson)
    }

    protected fun put(id: Long, dto: DTO, url: String = apiUrl): View {
        val viewJson = putRequest(id, dto, url)
            .andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
            .andReturn().response.contentAsString
        return getViewFromJson(viewJson)
    }

    protected fun delete(id: Long, url: String = apiUrl) {
        deleteRequest(id, url)
            .andExpect {
                status { isOk() }
            }
    }

    protected fun getRequest(id: Long, url: String = apiUrl): ResultActionsDsl {
        return mockMvc.get("$url/{id}", id)
    }

    protected fun postRequest(dto: DTO, url: String = apiUrl): ResultActionsDsl {
        return mockMvc.post(url) {
            contentType = MediaType.APPLICATION_JSON
            content = jsonMapper.writeValueAsString(dto)
            accept = MediaType.APPLICATION_JSON
        }
    }

    protected fun putRequest(id: Long, dto: DTO, url: String = apiUrl): ResultActionsDsl {
        return mockMvc.put("$url/{id}", id) {
            contentType = MediaType.APPLICATION_JSON
            content = jsonMapper.writeValueAsString(dto)
            accept = MediaType.APPLICATION_JSON
        }
    }

    protected fun deleteRequest(id: Long, url: String = apiUrl): ResultActionsDsl {
        return mockMvc.delete("$url/{id}", id)
    }

    protected fun assertNotFound(result: ResultActionsDsl) {
        result.andExpect {
            status { isNotFound() }
            content { contentType(MediaType.APPLICATION_JSON) }
            jsonPath("$.message") { value("$name not found") }
        }
    }

    protected fun getViewFromJson(json: String): View {
        return jsonMapper.readValue(json, viewToken)
    }

    protected fun getViewsFromJson(json: String): List<View> {
        val viewListType = jsonMapper.typeFactory.constructCollectionType(List::class.java, viewToken)
        return jsonMapper.readValue(json, viewListType)
    }
}