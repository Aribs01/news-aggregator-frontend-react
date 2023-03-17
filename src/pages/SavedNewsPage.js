import React from 'react';
import { NewsService } from '../service/NewsService';
import '../assets/styles/home.scss';
import { connect } from 'react-redux';
import News from '../component/News';

class SavedNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      source: '',
      items: [],
      items2: [],
      items3: [],
      selectedList: [],
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    this.setState({ source: isLoggedIn?.user?.data?.prefered_news_source })

    if (isLoggedIn?.user?.data?.prefered_news_source === 'BBC') {
      this.getNewsApiList();

    } else if (isLoggedIn?.user?.data?.prefered_news_source === 'Guardian') {
      this.getGuardianApiList();

    }
    else if (isLoggedIn?.user?.data?.prefered_news_source === 'NewYorkTimes') {
      this.getNewYorkTimesApiList();
    }


  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  handleSource = (event) => {
    this.setState({ source: event.target.value });
    if (event.target.value === 'BBC') {
      this.getNewsApiList();

    } else if (event.target.value === 'Guardian') {
      this.getGuardianApiList();

    }
    else if (event.target.value === 'NewYorkTimes') {
      this.getNewYorkTimesApiList();
    }
  }

  getNewsApiList() {
    const newsService = new NewsService();
    newsService.getNewsApi().then((data) => {

      const newArr = []
      data.articles.forEach((data) => {
        const singleData = {
          ...data,
          title: data.title,
          description: data.description,
          urlToImage: data.urlToImage,
          url: data.url,
          tag: data.url,
        }
        newArr.push(singleData)
      })
      this.setState({
        selectedList: newArr,
      })
    });
  }

  getGuardianApiList() {
    const newsService = new NewsService();
    newsService.getGuardianApi().then((data) => {
      const newArr = []
      data.results.forEach((data) => {
        const singleData = {
          ...data,
          title: data.webTitle,
          description: data.webTitle,
          urlToImage: data.urlToImage,
          url: data.webUrl,
          tag: data.pillarName,
        }
        newArr.push(singleData)
      })
      this.setState({
        selectedList: newArr,
      })
    });
  }

  getNewYorkTimesApiList() {
    const newsService = new NewsService();
    newsService.getNewYorkTimesApi().then((data) => {
      const newArr = []
      
      data.forEach((data) => {
        const singleData = {
          ...data,
          title: data.title,
          description: data.abstract,
          urlToImage: (data.multimedia && data.multimedia[0]) ? data?.multimedia[0].url : '',
          url: data.url,
          tag: data.section,
        }
        newArr.push(singleData)
      })

      this.setState({
        selectedList: newArr,
      })
    });
  }

  render() {
    const { search, source, selectedList } = this.state;

    const filteredItems = selectedList.filter((item) =>
      item?.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div id='home'>
        <div className='filter-container'>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={this.handleSearch}
          />
          <select value={source} onChange={this.handleSource}>
            <option value='BBC'>BBC News</option>
            <option value='Guardian'>The Guardian News</option>
            <option value='NewYorkTimes'>The New York Times</option>
          </select>
        </div>
        <h2>Your News Source</h2>
        <div className='section-4'>
          {
            filteredItems.map((item) => (
              <News
                key={item?.title}
                image={item.urlToImage}
                title={item?.title}
                tag={item?.section}
                description={item?.description}
                link={item?.url}
              />
            ))
          }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const isLoggedIn = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(SavedNewsPage);