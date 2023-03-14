import axios from 'axios';

export class NewsService {

  newsApiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' +
    process.env.REACT_APP_NEWS_API_KEY;

  guardianApiUrl = 'https://content.guardianapis.com/search?api-key=' +
    process.env.REACT_APP_GUARDIAN_KEY;

  newYorkTimesApiUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' +
    process.env.REACT_APP_NEW_YORK_TIMES_KEY;


  async getNewsApi() {
    const data = await axios.get(this.newsApiUrl);
    return data.data;
  }

  async getGuardianApi() {
    const data = await axios.get(this.guardianApiUrl);
    return data.data.response;
  }

  async getNewYorkTimesApi() {
    const data = await axios.get(this.newYorkTimesApiUrl);
    return data.data.results;
  }
}