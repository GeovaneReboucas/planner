package com.planner.planner.link;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planner.planner.trip.Trip;

@Service
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    public LinkCreateResponse registerLink(LinkRequestPayload payload, Trip trip) {
        Link newLink = new Link(payload.title(), payload.url(), trip);
        this.linkRepository.save(newLink);
        return new LinkCreateResponse(newLink.getId());
    }

    public List<LinkData> getAllLinksFromTrip(UUID tripId) {
        return this.linkRepository.findByTripId(tripId)
                .stream()
                .map(link -> new LinkData(
                        link.getId(),
                        link.getTitle(),
                        link.getUrl()))
                .toList();
    }
}
