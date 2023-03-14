import React from "react";
import '../assets/styles/home.scss';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      image: this.props.image,
      link: this.props.link
    };
  }
  render() {
    return (
      <div className='news-container'>
        <div className='image-container'>
          <a href={this.state?.link} target="_blank" rel="noopener noreferrer">
            <img src={ this.state?.image} alt={ this.state?.title + ' image'} />
          </a>
        </div>
        <div className='description'>
          <a href={this.state?.link} target="_blank" rel="noopener noreferrer">
            <div className='header'>
              { this.state?.title?.substring(0, 65) }

              { this.state?.title?.substring(0, 65).length >= 65 ? '...' : '' }
            </div>
          </a>
          <div className='content'>
            { this.state?.description?.substring(0, 100) }

            { this.state?.description?.substring().length >= 100 ? '...' : '' }
          </div>
        </div>
      </div>
    );
  }
}

export default News;
