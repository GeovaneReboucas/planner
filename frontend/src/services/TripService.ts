import { ApiService } from './ApiService';
import { Activity, ActivityPlanning, Link, Participant, Trip } from '../types';

class TripService extends ApiService {
  constructor() {
    super('/trips')
  }

  // Get
  async findTripById(id: string) {
    return await this.get<Trip>(`/${id}`);
  }

  async findParticipantsByTrip(id: string) {
    return await this.get<Participant[]>(`/${id}/participants`);
  }

  async findLinksByTrip(id: string) {
    return await this.get<Link[]>(`/${id}/links`);
  }

  async findActivitiesByTrip(id: string) {
    return await this.get<ActivityPlanning[]>(`/${id}/activities`);
  }
  //

  // Post
  async createLink(tripId: string, data: Omit<Link, 'id'>) {
    return await this.post<string>(data, `/${tripId}/links`);
  }

  async createActivity(tripId: string, data: Omit<Activity, 'id'>) {
    return await this.post<string>(data, `/${tripId}/activities`);
  }
  //

}

export const tripService = new TripService();