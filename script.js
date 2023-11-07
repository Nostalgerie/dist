const slideData = [
{
  index: 0,
  headline: 'Carmen R',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#carmenr',
  src: 'https://i.imgur.com/5Lf2kgz.jpg' },

{
  index: 1,
  headline: 'Lady',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#lady',
  src: 'https://i.imgur.com/kPrsCl9.jpg' },

{
  index: 2,
  headline: 'Dana R',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#danar',
  src: 'https://i.imgur.com/M2VwVn2.jpg' },

{
  index: 3,
  headline: 'Dana B',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#danab',
  src: 'https://i.imgur.com/4YtBya0.jpg' },

{
  index: 4,
  headline: 'Cora W',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#coraw',
  src: 'https://i.imgur.com/T16xmnq.jpg' },

{
  index: 5,
  headline: 'Miss',
  button: 'Explore',
  url: 'https://nostalgerie.eu/all-products#miss',
  src: 'https://i.imgur.com/zj0kpFj.jpg' }];




// =========================
// Slide
// =========================

class Slide {
  constructor(slideData, current, handleSlideClick) {
    this.slideData = slideData;
    this.current = current;
    this.handleSlideClick = handleSlideClick;

    this.slide = document.createElement('li');
    this.slide.className = 'slide';
    this.slide.style.setProperty('--x', 0);
    this.slide.style.setProperty('--y', 0);

    this.imageWrapper = document.createElement('div');
    this.imageWrapper.className = 'slide__image-wrapper';

    this.image = document.createElement('img');
    this.image.className = 'slide__image';
    this.image.alt = this.slideData.headline;
    this.image.src = this.slideData.src;
    this.image.addEventListener('load', this.imageLoaded.bind(this));

    this.content = document.createElement('article');
    this.content.className = 'slide__content';

    this.headline = document.createElement('h2');
    this.headline.className = 'slide__headline';
    this.headline.textContent = this.slideData.headline;

    this.button = document.createElement('button');
    this.button.className = 'slide__action btn';
    this.button.textContent = this.slideData.button;
    this.button.addEventListener('click', this.handleSlideClick.bind(this));

    this.content.appendChild(this.headline);
    this.content.appendChild(this.button);

    this.imageWrapper.appendChild(this.image);
    this.slide.appendChild(this.imageWrapper);
    this.slide.appendChild(this.content);

    if (this.current === this.slideData.index) {
      this.slide.className += ' slide--current';
    } else if (this.current - 1 === this.slideData.index) {
      this.slide.className += ' slide--previous';
    } else if (this.current + 1 === this.slideData.index) {
      this.slide.className += ' slide--next';
    }
  }

  handleMouseMove(event) {
    const r = this.slide.getBoundingClientRect();
    this.slide.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    this.slide.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave() {
    this.slide.style.setProperty('--x', 0);
    this.slide.style.setProperty('--y', 0);
  }

  handleSlideClick() {
    this.handleSlideClick(this.slideData.index);
  }

  handleButtonClicked() {
    const { url } = this.slideData;
    if (url) {
      window.location.href = url;
    }
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  getElement() {
    return this.slide;
  }
}

// Usage
const slideData = [
  {
    index: 0,
    headline: 'Carmen R',
    button: 'Explore',
    src: 'https://i.imgur.com/5Lf2kgz.jpg',
  },
  // Add more slide data here
];

function handleSlideClick(index) {
  // Handle slide click (e.g., change current slide)
}

const currentSlide = 0; // Set the current slide index here
const slides = slideData.map((data) => new Slide(data, currentSlide, handleSlideClick));
const slider = document.querySelector('.slider__wrapper');

slides.forEach((slide) => {
  slider.appendChild(slide.getElement());
});

      React.createElement("div", { className: "slide__image-wrapper" }, /*#__PURE__*/
      React.createElement("img", {
        className: "slide__image",
        alt: headline,
        src: src,
        onLoad: this.imageLoaded })), /*#__PURE__*/



      React.createElement("article", { className: "slide__content" }, /*#__PURE__*/
      React.createElement("h2", { className: "slide__headline" }, headline), /*#__PURE__*/
      React.createElement("button", { className: "slide__action btn" }, button))));



  }}



// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return /*#__PURE__*/(
    React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick }, /*#__PURE__*/
    React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" }, /*#__PURE__*/
    React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));



};


// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  componentDidMount() {
    const sliderWrapper = document.querySelector('.slider__wrapper');
    const hammer = new Hammer(sliderWrapper);

    hammer.on('swipeleft', this.handleNextClick);
    hammer.on('swiperight', this.handlePreviousClick);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ?
      this.props.slides.length - 1 :
      previous });

  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ?
      0 :
      next });

  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index });

    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)` };


    return /*#__PURE__*/(
      React.createElement("div", { className: "slider", "aria-labelledby": headingId }, /*#__PURE__*/
      React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform }, /*#__PURE__*/
      React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),

      slides.map(slide => {
        return /*#__PURE__*/(
          React.createElement(Slide, {
            key: slide.index,
            slide: slide,
            current: current,
            handleSlideClick: this.handleSlideClick }));


      })), /*#__PURE__*/


      React.createElement("div", { className: "slider__controls" }, /*#__PURE__*/
      React.createElement(SliderControl, {
        type: "previous",
        title: "Go to previous slide",
        handleClick: this.handlePreviousClick }), /*#__PURE__*/


      React.createElement(SliderControl, {
        type: "next",
        title: "Go to next slide",
        handleClick: this.handleNextClick }))));




  }}



ReactDOM.render( /*#__PURE__*/React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));
