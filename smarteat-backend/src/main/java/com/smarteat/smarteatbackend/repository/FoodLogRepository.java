package com.smarteat.smarteatbackend.repository;

import com.smarteat.smarteatbackend.entity.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FoodLogRepository extends JpaRepository<FoodLog, Long> {
    List<FoodLog> findByDate(LocalDate date);
    List<FoodLog> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
