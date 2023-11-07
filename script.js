import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs'; // Make sure you have Hammer.js imported

const slideData = [
  {
    index: 0,
    headline: 'Carmen R',
    button: 'Explore',
    src: 'https://i.imgur.com/5Lf2kgz.jpg'
  },
  {
    index: 1,
    headline: 'Lady',
    button: 'Explore',
    src: 'https://i.imgur.com/kPrsCl9.jpg'
  },
  {
    index: 2,
    headline: 'Dana R',
    button: 'Explore',
    src: 'https://i.imgur.com/M2VwVn2.jpg'
  },
  {
    index: 3,
    headline: 'Dana B',
    button: 'Explore',
    src: 'https://i.imgur.com/4YtBya0.jpg'
  },
  {
    index: 4,
    headline: 'Cora W',
    button: 'Explore',
    src: 'https://i.imgur.com/T16xmnq.jpg'
  },
  {
    index: 5,
    headline: 'Miss',
    button: 'Explore',
    src: 'https://i.imgur.com/zj0kpFj.jpg'
  }
];

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = 'slide';

    if (current === index) classNames += ' slide--current';
    else if (current - 1 === index) classNames += ' slide--previous';
    else if (current + 1 === index) classNames += ' slide--next';

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="slide__image-wrapper">
          <img
            className="slide__image"
            alt={headline}
            src={src}
            onLoad={this.imageLoaded}
          />
        </div>
        <article className="slide__content">
          <h2 className="slide__headline">{headline}</h2>
          <button className="slide__action btn">{button}</button>
        </article>
      </li>
    );
  }
}

const SliderControl = ({ type, title, handleClick }) => {
  return (
    <button
      className={`btn btn--${type}`}
      title={title}
      onClick={handleClick}
    >
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  );
};

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ? this.props.slides.length - 1 : previous,
    });
  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ? 0 : next,
    });
  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index,
      });
    }
  }

  componentDidMount() {
    // Add Hammer.js swipe event handling
    this.hammer = new Hammer(this.sliderRef.current);
    this.hammer.on("swipeleft", this.handleNextClick);
    this.hammer.on("swiperight", this.handlePreviousClick);
  }

  componentWillUnmount() {
    // Remove Hammer.js event listeners when the component unmounts
    this.hammer.off("swipeleft", this.handleNextClick);
    this.hammer.off("swiperight", this.handlePreviousClick);
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, "-").toLowerCase()}`;
    const wrapperTransform = {
      transform: `translateX(-${current * (100 / slides.length)}%)`,
    };

    return (
      <div className="slider" aria-labelledby={headingId}>
        <ul className="slider__wrapper" style={wrapperTransform} ref={this.sliderRef}>
          <h3 id={headingId} className="visuallyhidden">
            {heading}
          </h3>

          {slides.map((slide) => (
            <Slide
              key={slide.index}
              slide={slide}
              current={current}
              handleSlideClick={this.handleSlideClick}
            />
          ))}
        </ul>

        <div className="slider__controls">
          <SliderControl
            type="previous"
            title="Go to previous slide"
            handleClick={this.handlePreviousClick}
          />
          <SliderControl
            type="next"
            title="Go to next slide"
            handleClick={this.handleNextClick}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Slider heading="Example Slider" slides={slideData} />, document.getElementById('app'));
