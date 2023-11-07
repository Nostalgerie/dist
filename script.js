const slideData = [
{
  index: 0,
  headline: 'Carmen R',
  button: 'Explore',
  src: 'https://i.imgur.com/5Lf2kgz.jpg' },

{
  index: 1,
  headline: 'Lady',
  button: 'Explore',
  src: 'https://i.imgur.com/kPrsCl9.jpg' },

{
  index: 2,
  headline: 'Dana R',
  button: 'Explore',
  src: 'https://i.imgur.com/M2VwVn2.jpg' },

{
  index: 3,
  headline: 'Dana B',
  button: 'Explore',
  src: 'https://i.imgur.com/4YtBya0.jpg' },

{
  index: 4,
  headline: 'Cora W',
  button: 'Explore',
  src: 'https://i.imgur.com/T16xmnq.jpg' },

{
  index: 5,
  headline: 'Miss',
  button: 'Explore',
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

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, headline, index } = this.props.slide;
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
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave }, /*#__PURE__*/

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

    this.state = { current: 0, touchStart: null, touchEnd: null };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleTouchStart(e) {
    const touchStart = e.targetTouches[0].clientX;
    this.setState({ touchStart });
  }

  handleTouchMove(e) {
    const touchEnd = e.targetTouches[0].clientX;
    this.setState({ touchEnd });
  }

  handleTouchEnd() {
    const { touchStart, touchEnd } = this.state;
    // Consider a swipe only if the touch movement is more significant
    if (touchStart - touchEnd > 50) {
      // Swipe left
      this.handleNextClick();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      this.handlePreviousClick();
    }

    // Reset the touch positions
    this.setState({ touchStart: null, touchEnd: null });
  }

  // ... rest of your component methods ...

  render() {
    // ... rest of your component ...
    return (
      <div
        className="slider"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        aria-labelledby={headingId}
      >
        {/* ... rest of your component ... */}
      </div>
    );
  }
}

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
