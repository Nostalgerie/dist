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
  constructor(props) {
    this.props = props;
    this.slide = this.createSlide();
  }

  handleMouseMove(event) {
    const el = this.slide;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.style.setProperty('--x', 0);
    this.slide.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  handleButtonClick(event) {
    window.top.location.href = this.props.slide.url;
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  createSlide() {
    const { src, url, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = 'slide';
    if (current === index) classNames += ' slide--current';
    else if (current - 1 === index) classNames += ' slide--previous';
    else if (current + 1 === index) classNames += ' slide--next';

    const slide = document.createElement('li');
    slide.className = classNames;
    slide.addEventListener('click', this.handleSlideClick.bind(this));
    slide.addEventListener('mousemove', this.handleMouseMove.bind(this));
    slide.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'slide__image-wrapper';

    const image = document.createElement('img');
    image.className = 'slide__image';
    image.alt = headline;
    image.src = src;
    image.url = url;
    image.onload = this.imageLoaded.bind(this);

    imageWrapper.appendChild(image);

    const content = document.createElement('article');
    content.className = 'slide__content';

    const slideHeadline = document.createElement('h2');
    slideHeadline.className = 'slide__headline';
    slideHeadline.textContent = headline;

    const slideButton = document.createElement('button');
    slideButton.className = 'slide__action btn';
    slideButton.textContent = button;
    slideButton.addEventListener('click', this.handleButtonClick.bind(this));

    content.appendChild(slideHeadline);
    content.appendChild(slideButton);

    slide.appendChild(imageWrapper);
    slide.appendChild(content);

    return slide;
  }
}

class SliderControl {
  constructor(props) {
    this.props = props;
    this.control = this.createControl();
  }

  createControl() {
    const { type, title, handleClick } = this.props;
    const control = document.createElement('button');
    control.className = `btn btn--${type}`;
    control.title = title;
    control.addEventListener('click', handleClick);

    const icon = document.createElement('svg');
    icon.className = 'icon';
    icon.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElement('path');
    path.setAttribute('d', 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z');

    icon.appendChild(path);
    control.appendChild(icon);

    return control;
  }
}

class Slider {
  constructor(props) {
    this.props = props;
    this.state = { current: 0, direction: '' };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.render();
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;
    this.setState({
      current: previous < 0 ? this.props.slides.length - 1 : previous,
      direction: 'prev',
    });
  }

  handleNextClick() {
    const next = this.state.current + 1;
    this.setState({
      current: next === this.props.slides.length ? 0 : next,
      direction: 'next',
    });
  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({ current: index });
    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      transform: `translateX(-${current * (100 / slides.length)}%)`,
      transition: direction ? 'transform 0.5s ease-in-out' : '',
    };

    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.setAttribute('aria-labelledby', headingId);

    const wrapper = document.createElement('ul');
    wrapper.className = 'slider__wrapper';
    wrapper.style.cssText = `transform: ${wrapperTransform.transform}; transition: ${wrapperTransform.transition}`;

    const headingElement = document.createElement('h3');
    headingElement.id = headingId;
    headingElement.className = 'visuallyhidden';
    headingElement.textContent = heading;

    wrapper.appendChild(headingElement);

    slides.forEach((slide) => {
      const slideComponent = new Slide({ slide, current, handleSlideClick: this.handleSlideClick });
      wrapper.appendChild(slideComponent.slide);
    });

    const controls = document.createElement('div');
    controls.className = 'slider__controls';

    const previousControl = new SliderControl({
      type: 'previous',
      title: 'Go to previous slide',
      handleClick: this.handlePreviousClick,
    });

    const nextControl = new SliderControl({
      type: 'next',
      title: 'Go to next slide',
      handleClick: this.handleNextClick,
    });

    controls.appendChild(previousControl.control);
    controls.appendChild(nextControl.control);

    slider.appendChild(wrapper);
    slider.appendChild(controls);

    document.getElementById('app').appendChild(slider);
  }
}

// Render the Slider component
new Slider({ heading: 'Example Slider', slides: slideData });
