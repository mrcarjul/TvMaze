import React from 'react';

// Core
import {Text} from 'react-native';

// Utils
import PropTypes from 'prop-types';
import {fonts, getThemeColors} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description
 * @param {object} objectElements ex { children: [{…}], innerText: "", tagName: "p"}
 * @param {object} idx index if any
 */
function Summary({objectElements, idx}) {
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {children, tagName, innerText} = objectElements;
  const {textStyle} = fonts;

  if (tagName === 'p') {
    return (
      <Text style={[textStyle.centeredNormal, {color: colors.text}]}>
        {children?.length > 0
          ? children.map((child, index) => (
              <Summary
                objectElements={child}
                idx={`[${index}][${idx}]`}
                key={
                  idx !== undefined
                    ? `summary-${idx}[${index}]`
                    : `summary-[${index}]`
                }
              />
            ))
          : null}
        {innerText}
      </Text>
    );
  } else if (tagName === 'b') {
    return (
      <Text style={[textStyle.centeredNormalBold, {color: colors.text}]}>
        {innerText}
      </Text>
    );
  } else {
    // no other tagName supported yet so dont render to avoid error
    return null;
  }
}

Summary.propTypes = {
  objectElements: PropTypes.object.isRequired,
  idx: PropTypes.string,
};

export default Summary;
