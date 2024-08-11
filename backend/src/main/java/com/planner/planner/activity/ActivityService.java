package com.planner.planner.activity;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planner.planner.trip.Trip;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public ActivityCreateResponse registerActivity(ActivityRequestPayload payload, Trip trip) {
        Activity newActivity = new Activity(payload.title(), payload.occursAt(), trip);
        this.activityRepository.save(newActivity);
        return new ActivityCreateResponse(newActivity.getId());
    }

    public List<ActivityData> getAllActivitiesFromTrip(UUID tripId) {
        return this.activityRepository.findByTripId(tripId)
                .stream()
                .map(activity -> new ActivityData(
                        activity.getId(),
                        activity.getTitle(),
                        activity.getOccursAt()))
                .toList();
    }
}
