package com.jetbrains.life_science.controller.publisher

import com.jetbrains.life_science.container.approach.service.DraftApproachService
import com.jetbrains.life_science.controller.publisher.dto.PublisherDTO
import com.jetbrains.life_science.exception.auth.ForbiddenOperationException
import com.jetbrains.life_science.judge.service.JudgePublishService
import com.jetbrains.life_science.review.request.service.publish.PublishApproachRequestService
import com.jetbrains.life_science.user.credentials.entity.Credentials
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/publish")
class PublisherController(
    val judgePublishService: JudgePublishService,
    val publishApproachRequestService: PublishApproachRequestService,
    val draftApproachService: DraftApproachService
) {
    @Operation(summary = "Publish existing draft approach")
    @PostMapping("/approach")
    fun publishApproach(
        @AuthenticationPrincipal credentials: Credentials,
        @RequestBody dto: PublisherDTO
    ) {
        if (!credentials.isAdminOrModerator()) {
            throw ForbiddenOperationException()
        }
        val request = publishApproachRequestService.get(dto.id)
        judgePublishService.judgeApproachPublish(request)
    }
}
