import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.css';

export const CustomSelect = ({ options, onChange, value, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownId = `${id}-dropdown`;
  useEffect(() => {
    function clickListener(e) {
      const dropdown = document.getElementById(dropdownId);
      if (!dropdown.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', clickListener, false);
    return () => window.removeEventListener('click', clickListener, false);
  }, [isOpen, dropdownId]);

  const onKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        const firstOption = document.getElementById(
          `${id}-${options[0].value}`
        );
        if (firstOption) {
          window.requestAnimationFrame(() => firstOption.focus());
        }
      } else {
        setIsOpen(false);
      }
    }
  };

  const onOptionKeyDown = (e, value) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(value);
      setIsOpen(false);
    }
  };

  return (
    <span
      className={styles.value}
      id={dropdownId}
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
            <option
              onClick={() => {
                setIsOpen(false);
                onChange(option.value);
              }}
              className={cn(styles.customOption, {
                [styles.selectedOption]: value === option.value,
              })}
              id={`${id}-${option.value}`}
              tabIndex={isOpen ? 0 : undefined}
              onKeyDown={(e) => onOptionKeyDown(e, option.value)}
              key={option.value}
            >
              {option.label}
            </option>
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
  id: PropTypes.string.isRequired,
};
