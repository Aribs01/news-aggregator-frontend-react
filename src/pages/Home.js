import React from 'react';
import { NewsService } from '../service/NewsService';
// import News from '../component/News';
import '../assets/styles/home.scss';
import News from '../component/News';
import News2 from '../component/News2';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      items2: [],
      items3: [],
    };
  }

  componentDidMount() {
    this.getNewsApiList();
    this.getGuardianApiList();
    this.getNewYorkTimesApiList();
  }

  getNewsApiList() {
    const newsService = new NewsService();
    newsService.getNewsApi().then((data) => {
      this.setState({
        items: data.articles.slice(0, 9),
      })
    });
  }

  getGuardianApiList() {
    const newsService = new NewsService();
    newsService.getGuardianApi().then((data) => {
      this.setState({
        items2: data.results.slice(0, 8),
      })
    });
  }

  getNewYorkTimesApiList() {
    const newsService = new NewsService();
    newsService.getNewYorkTimesApi().then((data) => {
      this.setState({
        items3: data.slice(0, 8),
      })
    });
  }

  render() {
    const { items, items2, items3 } = this.state;

    return (
      <div id='home'>
        <div className='section-1'>
          <div className='left'>
            <h2>Recent News</h2>
            <div className='news-container'>
              <div className='image-container'>
                <img src={items[0]?.urlToImage} alt="news" />
              </div>
              <div className='description'>
                <a href={items[0]?.url} target="_blank" rel="noopener noreferrer">
                  <div className='header'>{items[0]?.title}</div>
                </a>
                <div className='content'>{items[0]?.description}</div>
              </div>
            </div>
          </div>

          <div className='right'>
            <h2>Other News</h2>
            <div className='news-container'>
              <div className='image-container'>
                <img src={items[1]?.urlToImage} alt="news" />
              </div>
              <div className='description'>
                <a href={items[1]?.url} target="_blank" rel="noopener noreferrer">
                  <div className='content'>{items[1]?.title}</div>
                </a>
              </div>
            </div>

            <div className='news-container'>
              <div className='image-container'>
                <img src={items[1]?.urlToImage} alt="news" />
              </div>
              <div className='description'>
                <div className='content'>{items[2]?.title}</div>
              </div>
            </div>
          </div>
        </div>

        <div className='section-2'>
          <div>
            <h2>Latest News</h2>
            <div className='inner-section-2'>
              {
                items.map((item) => (
                  <News
                    key={item?.urlToImage}
                    image={item?.urlToImage}
                    title={item?.title}
                    description={item.description}
                    link={item.url}
                  />
                ))
              }
            </div>
          </div>

          <div>
            <h2>Other News</h2>
            <div className='section-3'>
              {
                items2.map((item) => (
                  <News2
                    key={item?.id}
                    tag={item?.sectionName}
                    title={item?.webTitle}
                    link={item.webUrl}
                  />
                ))
              }
            </div>
          </div>
        </div>

        <h2>Recent News</h2>
        <div className='section-4'>
          {
            items3.map((item) => (
              <News
                key={item?.title}
                image={(item.multimedia && item.multimedia[0]) ? item?.multimedia[0].url : ''}
                title={item?.title}
                tag={item?.section}
                description={item?.abstract}
                link={item?.url}
              />
            ))
          }
        </div>

      </div>
    );
  }
}

export default Home;