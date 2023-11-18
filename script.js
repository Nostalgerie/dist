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
class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }
  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }
  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  handleButtonClick(event) {
  // Open the URL in a new tab when the button is clicked
  window.top.location.href = this.props.slide.url;
}
  imageLoaded(event) {
    event.target.style.opacity = 1;
  }
  render() {
    const { src, url, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = 'slide';
    if (current === index) classNames += ' slide--current';else
    if (current - 1 === index) classNames += ' slide--previous';else
    if (current + 1 === index) classNames += ' slide--next';

    return /*#__PURE__*/(
      React.createElement("li", {
        ref: this.slide,
        className: classNames,
        onClick: this.handleSlideClick,
        onButtonClick: this.handleButtonClick,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave }, /*#__PURE__*/

      React.createElement("div", { className: "slide__image-wrapper" }, /*#__PURE__*/
      React.createElement("img", {
        className: "slide__image",
        alt: headline,
        src: src,
        url: url,
        onLoad: this.imageLoaded })), /*#__PURE__*/



      React.createElement("article", { className: "slide__content" }, /*#__PURE__*/
      React.createElement("h2", { className: "slide__headline" }, headline), /*#__PURE__*/
      React.createElement("button", { className: "slide__action btn", onClick: this.handleButtonClick }, button))));



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

    // Duplicate the first and last slides
    const extendedSlides = [
      props.slides[props.slides.length - 1],
      ...props.slides,
      props.slides[0],
    ];

    this.state = { current: 1, slides: extendedSlides };
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
  const totalSlides = this.props.slides.length;
  let newCurrent;

  if (index === 0) {
    // Clicked on the duplicated first slide, set to the last actual slide
    newCurrent = totalSlides - 1;
  } else if (index === totalSlides + 1) {
    // Clicked on the duplicated last slide, set to the first actual slide
    newCurrent = 0;
  } else {
    newCurrent = index - 1; // Adjust for duplicated slides
  }

  this.setState({
    current: newCurrent,
  });
}

  render() {
  const { current } = this.state;
  const { slides } = this.props;
  const headingId = `slider-heading__${this.props.heading.replace(/\s+/g, '-').toLowerCase()}`;
  const wrapperTransform = {
    'transform': `translateX(-${current * (100 / (slides.length + 2))}%)`,
  };

  return React.createElement(
    'div',
    { className: 'slider', 'aria-labelledby': headingId },
    React.createElement('ul', { className: 'slider__wrapper', style: wrapperTransform },
      React.createElement('h3', { id: headingId, className: 'visuallyhidden' }, this.props.heading),

      this.state.slides.map((slide, index) =>
        React.createElement(Slide, {
          key: index,
          slide: slide,
          current: current,
          handleSlideClick: this.handleSlideClick,
        })
      )
    ),

    React.createElement('div', { className: 'slider__controls' },
      React.createElement(SliderControl, {
        type: 'previous',
        title: 'Go to previous slide',
        handleClick: this.handlePreviousClick,
      }),
      React.createElement(SliderControl, {
        type: 'next',
        title: 'Go to next slide',
        handleClick: this.handleNextClick,
      })
    )
  );
}}

ReactDOM.render( /*#__PURE__*/React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));
