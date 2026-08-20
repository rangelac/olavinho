import axios from 'axios';

const BASE_URL = 'https://graph.facebook.com/v19.0';

class MetaApiService {
  constructor() {
    this.accessToken = '';
  }

  setToken(token) {
    this.accessToken = token;
  }

  async getAdAccounts() {
    if (!this.accessToken) throw new Error('Access Token missing');
    try {
      const response = await axios.get(`${BASE_URL}/me/adaccounts`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,name,account_id'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ad accounts:', error);
      throw error;
    }
  }

  async getCampaigns(adAccountId, timeRange) {
    if (!this.accessToken) throw new Error('Access Token missing');
    try {
      // timeRange format: {since: 'YYYY-MM-DD', until: 'YYYY-MM-DD'} ou preset como 'last_7d'
      const timeParams = typeof timeRange === 'string' 
        ? { date_preset: timeRange } 
        : { time_range: JSON.stringify(timeRange) };

      const response = await axios.get(`${BASE_URL}/${adAccountId}/campaigns`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,name,insights{spend,clicks,impressions,reach,actions}',
          ...timeParams
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  async getOverallInsights(adAccountId, timeRange) {
    if (!this.accessToken) throw new Error('Access Token missing');
    try {
      const timeParams = typeof timeRange === 'string' 
        ? { date_preset: timeRange } 
        : { time_range: JSON.stringify(timeRange) };

      const response = await axios.get(`${BASE_URL}/${adAccountId}/insights`, {
        params: {
          access_token: this.accessToken,
          fields: 'spend,clicks,impressions,reach,actions',
          ...timeParams
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  async getPageInsights(pageId, timeRange) {
    if (!this.accessToken) throw new Error('Access Token missing');
    try {
        const timeParams = typeof timeRange === 'string' 
        ? { date_preset: timeRange } 
        : { since: timeRange.since, until: timeRange.until }; 

      // Example metric: page_views_total, page_engaged_users
      const response = await axios.get(`${BASE_URL}/${pageId}/insights`, {
        params: {
          access_token: this.accessToken,
          metric: 'page_views_total,page_engaged_users',
          period: 'day',
          ...timeParams
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching page insights:', error);
      throw error;
    }
  }
}

export const metaApi = new MetaApiService();
