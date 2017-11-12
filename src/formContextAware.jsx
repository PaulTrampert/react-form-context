import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

const formContextAware = (WrappedComponent) => {
  class FormContextAware extends React.Component {
    constructor(props, context) {
      super(props);

      this.form = context.form;

      this.state = {
        isSubmitting: context.form.isSubmitting,
        hasSubmitted: context.form.hasSubmitted
      };
    }

    componentDidMount = () => {
      this.unsubscribe = this.form.subscribe(this.handleContextUpdate);
    }

    componentWillUnmount = () => {
      this.unsubscribe();
    }

    handleContextUpdate = (context) => {
      this.setState({
        isSubmitting: context.isSubmitting,
        hasSubmitted: context.hasSubmitted
      });
    }

    render() {
      let rest = this.props;

      let {
        isSubmitting,
        hasSubmitted
      } = this.state;
      return <WrappedComponent isSubmitting={isSubmitting} hasSubmitted={hasSubmitted} {...rest} />;
    }
  }

  FormContextAware.contextTypes = {
    form: PropTypes.instanceOf(FormContext).isRequired
  };

  return FormContextAware;
};

export default formContextAware;