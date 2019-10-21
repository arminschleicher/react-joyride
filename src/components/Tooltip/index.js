import React from 'react';
import PropTypes from 'prop-types';
import { getText } from '../../modules/helpers';
import Container from './Container';

export default class JoyrideTooltip extends React.Component {
  static propTypes = {
    continuous: PropTypes.bool.isRequired,
    helpers: PropTypes.object.isRequired,
    id: PropTypes.string,
    index: PropTypes.number.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    onSeen: PropTypes.func,
    setTooltipRef: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    step: PropTypes.object.isRequired,
  };

  handleClickBack = e => {
    e.preventDefault();
    const { helpers } = this.props;

    helpers.prev();
  };

  handleSeen = () => {
    const { isLastStep, id, onSeen } = this.props;
    const storage = localStorage;
    const storeId = `${id}-seen`;
    if (isLastStep && !storage.getItem(storeId)) {
      setTimeout(() => {
        storage.setItem(storeId, true);
        if (onSeen && typeof onSeen === 'function') {
          onSeen(storeId);
        }
      }, 500);
    }
  };

  handleClickClose = e => {
    e.preventDefault();
    const { helpers } = this.props;
    this.handleSeen();
    helpers.close();
  };

  handleClickPrimary = e => {
    e.preventDefault();
    const { continuous, helpers, isLastStep } = this.props;

    if (isLastStep) {
      this.handleSeen();
    }

    if (!continuous) {
      helpers.close();
      return;
    }

    helpers.next();
  };

  handleClickSkip = e => {
    e.preventDefault();
    const { helpers } = this.props;

    helpers.skip();
  };

  getElementsProps = () => {
    const { continuous, isLastStep, setTooltipRef, step } = this.props;

    const back = getText(step.locale.back);
    const close = getText(step.locale.close);
    const last = getText(step.locale.last);
    const next = getText(step.locale.next);
    const skip = getText(step.locale.skip);

    let primaryText = continuous ? next : close;

    if (isLastStep) {
      primaryText = last;
    }

    return {
      backProps: {
        'aria-label': back,
        'data-action': 'back',
        onClick: this.handleClickBack,
        role: 'button',
        title: back,
      },
      closeProps: {
        'aria-label': close,
        'data-action': 'close',
        onClick: this.handleClickClose,
        role: 'button',
        title: close,
      },
      primaryProps: {
        'aria-label': primaryText,
        'data-action': 'primary',
        onClick: this.handleClickPrimary,
        role: 'button',
        title: primaryText,
      },
      skipProps: {
        'aria-label': skip,
        'data-action': 'skip',
        onClick: this.handleClickSkip,
        role: 'button',
        title: skip,
      },
      tooltipProps: {
        'aria-modal': true,
        ref: setTooltipRef,
        role: 'alertdialog',
      },
    };
  };

  render() {
    const { continuous, index, isLastStep, size, step, id } = this.props;
    const { beaconComponent, tooltipComponent, ...cleanStep } = step;
    let component;

    if (tooltipComponent) {
      const renderProps = {
        ...this.getElementsProps(),
        continuous,
        index,
        isLastStep,
        size,
        step: cleanStep,
      };

      const TooltipComponent = tooltipComponent;
      component = <TooltipComponent {...renderProps} />;
    } else {
      component = (
        <Container
          {...this.getElementsProps()}
          continuous={continuous}
          index={index}
          isLastStep={isLastStep}
          size={size}
          step={step}
        />
      );
    }

    return component;
  }
}
