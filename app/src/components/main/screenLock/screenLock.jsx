import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { screenLockVisibilitySelector } from 'controllers/screenLock';
import { SpinningPreloader } from 'components/preloaders/spinningPreloader';
import styles from './screenLock.scss';

const ScreenLockRoot = document.getElementById('screen-lock-root');
const cx = classNames.bind(styles);

@connect((state) => ({
  shown: screenLockVisibilitySelector(state),
}))
export class ScreenLock extends Component {
  static propTypes = {
    shown: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          this.props.shown && (
            <div className={cx('screen-lock')}>
              <div className={cx('backdrop')} />
              <SpinningPreloader />
            </div>
          ),
          ScreenLockRoot,
        )}
      </Fragment>
    );
  }
}
