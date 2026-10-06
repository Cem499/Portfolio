// Before/after comparison. The handle is a native range input stretched over the image,
// so it works with mouse, touch and keyboard (arrow keys) and needs only the small inline
// script below, which the static project pages embed once (BEFORE_AFTER_SCRIPT).
// `width`/`height`: intrinsic size of both images. The default 16:10 pair spans the column;
// any other pair keeps its ratio and is shown at most at its own width. The before image is
// the LCP element (the after image starts half clipped), so it gets the high priority.
export default function BeforeAfterSlider({ before, after, labels, width = 1440, height = 900 }) {
  const custom = width !== 1440 || height !== 900
  return (
    <figure className={custom ? 'ba ba-custom' : 'ba'} data-ba style={custom ? { maxWidth: `${width}px` } : undefined}>
      <div className="ba-frame" style={custom ? { aspectRatio: `${width} / ${height}` } : undefined}>
        <img className="ba-img" src={before.src} srcSet={before.srcSet} sizes={before.sizes} width={width} height={height} alt={before.alt} fetchpriority="high" decoding="async" />
        <div className="ba-after" style={{ clipPath: 'inset(0 0 0 50%)' }}>
          <img className="ba-img" src={after.src} srcSet={after.srcSet} sizes={after.sizes} width={width} height={height} alt={after.alt} decoding="async" />
        </div>
        <div className="ba-line" style={{ left: '50%' }} aria-hidden="true">
          <span className="ba-handle"></span>
        </div>
        <span className="ba-tag ba-tag-before" aria-hidden="true">{labels.before}</span>
        <span className="ba-tag ba-tag-after" aria-hidden="true">{labels.after}</span>
        <input className="ba-range" type="range" min="0" max="100" defaultValue="50" step="1" aria-label={labels.handle} />
      </div>
    </figure>
  )
}

export const BEFORE_AFTER_SCRIPT = `document.querySelectorAll('[data-ba]').forEach(function (el) {
  var range = el.querySelector('.ba-range'), after = el.querySelector('.ba-after'), line = el.querySelector('.ba-line');
  function update() { after.style.clipPath = 'inset(0 0 0 ' + range.value + '%)'; line.style.left = range.value + '%'; }
  range.addEventListener('input', update);
  update();
});`
