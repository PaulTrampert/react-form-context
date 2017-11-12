import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import getPassthroughProps from './util/getPassthroughProps';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.form = new FormContext(this.props.name);
  }

  getChildContext = () => {
    return {form: this.form};
  }

  handleSubmit = async (event) => {
    let {
      onSubmit,
      onInvalidSubmit,
      onSubmitError
    } = this.props;
    event.preventDefault();
    this.form.isSubmitting = true;
    try {
      if (await this.form.isValid()) {
        await onSubmit(event);
      }
      else {
        await onInvalidSubmit(event);
      }
    } catch (e) {
      onSubmitError(e);
    }
    finally {
      this.form.isSubmitting = false;
      this.form.hasSubmitted = true;
    }
  }

  render() {
    let {
      children
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit} {...getPassthroughProps(this)}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInvalidSubmit: PropTypes.func,
  onSubmitError: PropTypes.func,
  children: PropTypes.node.isRequired,
  name: PropTypes.string
};

Form.defaultProps = {
  onInvalidSubmit: () => {},
  onSubmitError: (e) => console.error(e)
};

Form.childContextTypes = {
  form: PropTypes.instanceOf(FormContext)
};

export default Form;