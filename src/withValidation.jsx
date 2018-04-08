import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import getPassthroughProps from './util/getPassthroughProps';
import Debouncer from './util/Debouncer.js';

const withValidation = (WrappedComponent) => {

  class WithValidation extends React.Component {
    constructor(props, context) {
      super(props);
      this.debouncer = new Debouncer();
      this.state = {
        validationErrors: [],
        isValidating: false
      };

      if (context && context.form) {
        this.form = context.form;
      }
    }

    componentDidMount() {
      this.validate();
      if (this.form) {
        this.form.registerField(this);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({isValidating: true});
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        this.debouncer.debounce(this.validate(), {swallowDebounce: true});
      }
    }

    componentWillUnmount() {
      if (this.form) {
        this.form.unregisterField(this);
      }
    }

    get isValidating() {
      return this.state.isValidating;
    }

    get isValid() {
      return this.state.validationErrors.length === 0;
    }

    validate = async () => {
      let {
        name,
        value,
        validators,
        onValidated
      } = this.props;
      this.setState({isValidating: true});
      let promises = validators.map(v => v(value, name));
      let validationErrors = await Promise.all(promises);
      validationErrors = validationErrors.filter(e => !!e);
      onValidated({
        name,
        value,
        validationErrors
      });
      this.setState({
        isValidating: false,
        validationErrors
      });
    }

    render = () => {
      let {
        validationErrors,
        isValidating
      } = this.state;

      let props = getPassthroughProps(this);
      props.value = this.props.value;
      props.name = this.props.name;

      return <WrappedComponent validationErrors={validationErrors} isValidating={isValidating} {...props} />;
    }
  }

  WithValidation.propTypes = {
    onValidated: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.any,
    validators: PropTypes.arrayOf(PropTypes.func)
  };

  WithValidation.defaultProps = {
    onValidated: () => {},
    validators: []
  };

  WithValidation.contextTypes = {
    form: PropTypes.instanceOf(FormContext)
  };

  return WithValidation;
};

export default withValidation;