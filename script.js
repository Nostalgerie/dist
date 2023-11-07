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
