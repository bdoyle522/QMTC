import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.css';

export const CustomSelect = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function clickListener(e) {
      const dropdown = document.getElementById('custom-dropdown');
      if (e.target.contains(dropdown) && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', clickListener, false);
    return () => window.removeEventListener('click', clickListener, false);
  }, [isOpen]);

  const onKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        const firstOption = document.getElementById(options[0].value);
        if (firstOption) {
          firstOption.focus();
        }
      } else {
        setIsOpen(false);
      }
    }
  };

  const onOptionKeyDown = (e, value) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange({ target: { value } });
      setIsOpen(false);
    }
  };

  return (
    <span
      className={styles.value}
      id="custom-dropdown"
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {options.find((opt) => opt.value === value)?.label || ''}{' '}
      {!isOpen ? (
        <FontAwesomeIcon icon={faChevronDown} color="#c8d0db" />
      ) : (
        <FontAwesomeIcon icon={faChevronUp} color="#c8d0db" />
      )}
      <div className={cn({ [styles.open]: isOpen, [styles.closed]: !isOpen })}>
        {options.map((option) => {
          return (
            <span
              onClick={() => {
                setIsOpen(false);
                onChange({ target: { value: option.value } });
              }}
              className={cn(styles.customOption, {
                [styles.selectedOption]: value === option.value,
              })}
              id={option.value}
              tabIndex={isOpen ? 0 : undefined}
              onKeyDown={(e) => onOptionKeyDown(e, option.value)}
              key={option.value}
            >
              {option.label}
            </span>
          );
        })}
      </div>
    </span>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onChange: PropTypes.func.isRequired,
};
