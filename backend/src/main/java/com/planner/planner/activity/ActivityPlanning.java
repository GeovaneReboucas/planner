package com.planner.planner.activity;

import java.time.LocalDateTime;
import java.util.List;

public record ActivityPlanning(LocalDateTime date, List<ActivityData> activities) {
    
}
