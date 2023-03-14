import React from "react";
import '../assets/styles/home.scss';

class News2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      tag: this.props.tag,
      link: this.props.link
    };
  }
  render() {
    return (
      <div className='news2-container'>
        <div className='description2'>
          <ul>
            <li className="list">
              <a href={this.state?.link} target="_blank" rel="noopener noreferrer">
                <div className='header'>
                  {this.state?.title}
                </div>
              </a>
              <span className="tag">
                {this.state?.tag}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default News2;
