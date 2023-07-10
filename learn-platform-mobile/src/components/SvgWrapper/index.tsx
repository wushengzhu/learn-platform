import { ReactSVG } from 'react-svg';

interface IProps {
  src?: string;
  height?: string;
  width?: string;
  color?: string;
}
/**
 * SVG 颜色修改器
 */
const SvgWrapper = ({ src, height, width, color }: IProps) => {
  const beforeInjectionHandler = (svg: SVGSVGElement) => {
    // 设置style属性
    svg.setAttribute('style', `height: ${height};width:${width}`);
    svg.childNodes.forEach((item) => {
      const it = item as HTMLElement;
      if (it.tagName === 'path' && color) {
        // 设置fill属性
        it.setAttribute('fill', color);
      }
    });
  };
  if (!src) {
    return null;
  }
  return (
    <ReactSVG
      src={src}
      wrapper="span"
      beforeInjection={beforeInjectionHandler}
    />
  );
};

SvgWrapper.defaultProps = {
  height: '25',
  width: '25',
  color: '',
  src: '',
};

export default SvgWrapper;
