function getPassthroughProps(element) {
  let props = {...(element.props)};

  if (Object.getPrototypeOf(element).constructor.propTypes) {
    let propTypes = Object.getPrototypeOf(element).constructor.propTypes;
    Object.keys(propTypes).forEach(key => {
      if (key in props) {
        delete props[key];
      }
    });
  }

  return props;
}

export default getPassthroughProps;