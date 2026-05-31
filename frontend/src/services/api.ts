import type { Car, RecommendationRequest, RecommendationResponse } from '../types';

const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const api = {
  // Cars Endpoints
  async getCars(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}/cars`);
    return handleResponse(response);
  },

  async getFeatures(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/cars/features`);
    return handleResponse(response);
  },

  async getRecommendations(request: RecommendationRequest): Promise<RecommendationResponse[]> {
    const response = await fetch(`${BASE_URL}/cars/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return handleResponse(response);
  },

  // Shortlist Endpoints
  async getShortlist(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}/shortlist`);
    return handleResponse(response);
  },

  async addToShortlist(carId: number): Promise<{ message: string; success: boolean }> {
    const response = await fetch(`${BASE_URL}/shortlist/${carId}`, {
      method: 'POST',
    });
    return handleResponse(response);
  },

  async removeFromShortlist(carId: number): Promise<{ message: string; success: boolean }> {
    const response = await fetch(`${BASE_URL}/shortlist/${carId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  async checkShortlisted(carId: number): Promise<{ isShortlisted: boolean }> {
    const response = await fetch(`${BASE_URL}/shortlist/check/${carId}`);
    return handleResponse(response);
  },
};
