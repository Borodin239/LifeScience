package com.jetbrains.life_science.edit_record.repository

import com.jetbrains.life_science.edit_record.entity.ApproachEditRecord
import org.springframework.data.jpa.repository.JpaRepository

interface ApproachEditRecordRepository : JpaRepository<ApproachEditRecord, Long>
