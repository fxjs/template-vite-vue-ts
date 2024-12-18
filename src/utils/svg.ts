import { h } from 'vue';
import { parseSync as svgToJson } from 'svgson';

/**
 * Convert a style string to an object. Also, replace
 * stroke and fill color with currentColor if they are
 * set
 *
 * @param  {string} styleString Style string to convert to an object
 * @return {object}             Style object
 */
const styleToObject = function (styleString: any) {
  return styleString.split(';').reduce((accumulator: any, item: any) => {
    // eslint-disable-next-line prefer-const
    let [key, value] = item.split(':');

    if (key === 'fill' && value !== 'none') {
      value = 'currentColor';
    }

    if (key === 'stroke' && value !== 'none') {
      value = 'currentColor';
    }

    accumulator[key] = value;
    return accumulator;
  }, {});
};

/**
 * Create an icon component
 *
 * @param  {Array}  props Element props
 * @param  {string} svg   svg string
 */
export function iconBase(props: any, svg: string) {
  const svgJsonParsed = svgToJson(svg);

  const { multicolor, pathfill, twotone, width, height, viewBox } = svgJsonParsed.attributes;

  svgJsonParsed.attributes.width = '1em';
  svgJsonParsed.attributes.height = '1em';
  svgJsonParsed.attributes.xmlns = 'http://www.w3.org/2000/svg';

  // If viewbox is not set, set it to the width and height of the svg
  if (viewBox === undefined) {
    // Make sure that width and height are set
    if (width === undefined || height === undefined) {
      throw new Error('Width and height must be set if viewBox is not set');
    }

    svgJsonParsed.attributes.viewBox = `0 0 ${width} ${height}`;
  }

  const updateStyle = function (attributes: any) {
    const { fill, stroke, style } = attributes;

    const canFill = !twotone && fill && ['none', 'white', '#fff'].includes(fill) === false;

    if (twotone === 'true' && fill === undefined) {
      attributes.fill = 'currentColor';
    } else if (canFill || pathfill !== undefined) {
      attributes.fill = props.color === undefined ? 'currentColor' : props.color;
    }

    if (stroke !== undefined && stroke !== 'none') {
      attributes.stroke = props.color === undefined ? 'currentColor' : props.color;
    }

    if (style !== undefined) {
      const styleObject = styleToObject(style);
      attributes = {
        ...attributes,
        ...styleObject,
      };
      attributes.style = '';
    }

    return attributes;
  };

  /**
   * Render a Vue component recursively
   *
   * @param  {object} element Element object including attributes, children .. etc
   * @return {string}         svg string
   */
  // @ts-ignore
  const createElement = function (element) {
    const { name, attributes, children } = element;

    if (multicolor !== 'true') {
      element.attributes = updateStyle(attributes);
    }

    if (Array.isArray(children)) {
      const { attributes } = element;

      // If node name is title then skip looping over children
      // as this will cause to display invalid vnode error
      if (name === 'title') {
        return h(name, attributes);
      }

      return h(name, attributes, children.map(createElement));
    }
    return h(name, element.attributes);
  };

  // use an array to return multiple root nodes
  return createElement(svgJsonParsed);
}
