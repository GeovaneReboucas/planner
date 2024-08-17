package com.planner.planner.trip;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planner.planner.activity.ActivityCreateResponse;
import com.planner.planner.activity.ActivityData;
import com.planner.planner.activity.ActivityPlanning;
import com.planner.planner.activity.ActivityRequestPayload;
import com.planner.planner.activity.ActivityService;
import com.planner.planner.link.LinkCreateResponse;
import com.planner.planner.link.LinkData;
import com.planner.planner.link.LinkRequestPayload;
import com.planner.planner.link.LinkService;
import com.planner.planner.participant.ParticipantCreateResponse;
import com.planner.planner.participant.ParticipantData;
import com.planner.planner.participant.ParticipantRequestPayload;
import com.planner.planner.participant.ParticipantService;

@RestController
@RequestMapping("/trips")
public class TripController {
    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private LinkService linkService;

    @PostMapping
    public ResponseEntity<TripCreateResponse> createTrip(@RequestBody TripRequestPayload payload){
        Trip newTrip = new Trip(payload);
        this.tripRepository.save(newTrip);
        this.participantService.registerParticipantsToEvent(payload.emailsToInvite(), newTrip);
        return ResponseEntity.ok(new TripCreateResponse(newTrip.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripDetails(@PathVariable UUID id){
        Optional<Trip> trip = this.tripRepository.findById(id);
        return trip.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable UUID id, @RequestBody TripRequestPayload payload){
        Optional<Trip> trip = this.tripRepository.findById(id);
        if(trip.isPresent()){
            Trip rawTrip = trip.get();
            rawTrip.setEndsAt(LocalDateTime.parse(payload.endsAt(), DateTimeFormatter.ISO_DATE_TIME));
            rawTrip.setStartsAt(LocalDateTime.parse(payload.startsAt(), DateTimeFormatter.ISO_DATE_TIME));
            rawTrip.setDestination(payload.destination());
            this.tripRepository.save(rawTrip);
            return ResponseEntity.ok(rawTrip);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/confirm")
    public ResponseEntity<Trip> confirmTrip(@PathVariable UUID id){
        Optional<Trip> trip = this.tripRepository.findById(id);
        if(trip.isPresent()){
            Trip rawTrip = trip.get();
            rawTrip.setIsConfirmed(true);
            this.tripRepository.save(rawTrip);
            this.participantService.triggerConfirmationEmailToParticipants(id);
            return ResponseEntity.ok(rawTrip);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/invite")
    public ResponseEntity<ParticipantCreateResponse> inviteParticipant(@PathVariable UUID id, @RequestBody ParticipantRequestPayload payload){
        Optional<Trip> trip = this.tripRepository.findById(id);
        if(trip.isPresent()){
            Trip rawTrip = trip.get();
            ParticipantCreateResponse participantResponse = this.participantService.registerParticipantToEvent(payload.email(), rawTrip);
            if(rawTrip.getIsConfirmed()){
                this.participantService.triggerConfirmationEmailToParticipant(payload.email()); 
            }
            return ResponseEntity.ok(participantResponse);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantData>> getAllParticipants(@PathVariable UUID id) {
        List<ParticipantData> participantList = this.participantService.getAllParticipantsFromTrip(id);
        return ResponseEntity.ok(participantList);
    }
    
    @PostMapping("/{id}/activities")
    public ResponseEntity<ActivityCreateResponse> registerActivity(@PathVariable UUID id, @RequestBody ActivityRequestPayload payload){
        Optional<Trip> trip = this.tripRepository.findById(id);
        if(trip.isPresent()){
            Trip rawTrip = trip.get();
            ActivityCreateResponse activityResponse = this.activityService.registerActivity(payload, rawTrip);
            return ResponseEntity.ok(activityResponse);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/activities")
    public ResponseEntity<List<ActivityPlanning>> getAllActivities(@PathVariable UUID id) {
        Optional<Trip> trip = this.tripRepository.findById(id);
        if (!trip.isPresent()) return ResponseEntity.notFound().build();
    
        List<ActivityData> activityList = this.activityService.getAllActivitiesFromTrip(id)
            .stream()
            .sorted(Comparator.comparing(ActivityData::occursAt))
            .toList();
    
        // Agrupar as atividades por dia
        Map<LocalDateTime, List<ActivityData>> groupedActivities = activityList.stream()
            .collect(Collectors.groupingBy(activity -> activity.occursAt().toLocalDate().atStartOfDay()));
    
        // Transformar o map em uma lista de ActivityPlanning
        List<ActivityPlanning> activityPlanning = groupedActivities
            .entrySet()
            .stream()
            .map(entry -> new ActivityPlanning(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList())
            .reversed();

        activityPlanning.sort(Comparator.comparing(ActivityPlanning::date));
    
        return ResponseEntity.ok(activityPlanning);
    }

    @PostMapping("/{id}/links")
    public ResponseEntity<LinkCreateResponse> registerLink(@PathVariable UUID id, @RequestBody LinkRequestPayload payload) {
        Optional<Trip> trip = this.tripRepository.findById(id);
        if(trip.isPresent()){
            Trip rawTrip = trip.get();
            LinkCreateResponse linkResponse = this.linkService.registerLink(payload, rawTrip);
            return ResponseEntity.ok(linkResponse);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/links")
    public ResponseEntity<List<LinkData>> getAllLinks(@PathVariable UUID id){
        List<LinkData> linkList = this.linkService.getAllLinksFromTrip(id);
        return ResponseEntity.ok(linkList);
    }
}   
